import { loadScript } from "vue-plugin-load-script";
import { defineStore } from "pinia";
import { useTabStore } from "./useTabStore";
import { useStorage } from "@vueuse/core";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useToastStore } from "./useToastStore";
import { useIO } from "~~/composables/useIO";

const tabStore = useTabStore();
const toastStore = useToastStore();
const { tabData, activeTabIdx } = storeToRefs(tabStore);
const CLIENT_ID = "485951106142-grngi08vhqptgh232iv4ekojjevdmu2h.apps.googleusercontent.com";
const API_KEY = useRuntimeConfig().public.GOOGLE_API_KEY;
const scopes = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly";
const accessToken = useStorage("token", "", sessionStorage);
const loaded = ref(false);
const tokenClient = ref();
const { getFilename } = useIO();

const getClient = async () => {
  if (!loaded.value) {
    // First, load and initialize the gapi.client
    await loadScript("https://apis.google.com/js/api.js");
    await new Promise((resolve, reject) => {
      window.gapi.load("client:picker", { callback: resolve, onerror: reject });
    });
    await window.gapi.client.init({}).then(() => {
      window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/drive/v3/rest");
    });
    // Now load the GIS client
    await loadScript("https://accounts.google.com/gsi/client");
    const _client = await new Promise((resolve, reject) => {
      try {
        resolve(
          window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: scopes,
            prompt: "consent",
            callback: "", // defined at request time in await/promise scope.
          }),
        );
      } catch (err) {
        reject(err);
      }
    });
    loaded.value = true;
    return _client;
  } else {
    return tokenClient.value;
  }
};

const getToken = async (option: { prompt: string }): Promise<{ access_token: string }> =>
  await new Promise((resolve, reject) => {
    // Settle this promise in the response callback for requestAccessToken()
    tokenClient.value.callback = (resp) => {
      if (resp.error !== undefined) {
        reject(resp);
      }
      // GIS has automatically updated gapi.client with the newly issued access token.
      resolve(resp);
    };
    tokenClient.value.requestAccessToken(option);
  });

export const useGoogleStore = defineStore("GoogleStore", () => {
  const pickerCallback = async (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      const document = data[window.google.picker.Response.DOCUMENTS][0];
      const fileId = document[window.google.picker.Document.ID];
      const folderId = document.parentId;
      const { body } = await window.gapi.client.drive.files.get({
        fileId: fileId,
        alt: "media",
      });
      // fetch folder name
      const { result } = await window.gapi.client.drive.files.get({
        fileId: folderId,
        fields: "name",
      });

      tabStore.importJson(body, document.name.replace(".json", ""));
      tabData.value[activeTabIdx.value].folder = result.name;
      tabData.value[activeTabIdx.value].folderId = folderId;
    }
  };

  const launchPicker = async () => {
    try {
      tokenClient.value = await getClient();
      if (!accessToken.value) {
        accessToken.value = (await getToken({ prompt: "consent" })).access_token;
      } else {
        accessToken.value = (await getToken({ prompt: "" })).access_token;
      }

      const view = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS).setIncludeFolders(true);
      view.setMimeTypes("application/json");
      const picker = new window.google.picker.PickerBuilder()
        .setOAuthToken(accessToken.value)
        .setDeveloperKey(API_KEY)
        .addView(view)
        .addView(new window.google.picker.DocsUploadView())
        .setCallback(pickerCallback)
        .build();
      picker.setVisible(true);
    } catch (error) {
      window.alert("ERROR! Check console message");
      console.error(error);
    }
  };

  const launchFolderPicker = async () => {
    try {
      tokenClient.value = await getClient();
      if (!accessToken.value) {
        accessToken.value = (await getToken({ prompt: "consent" })).access_token;
      } else {
        accessToken.value = (await getToken({ prompt: "" })).access_token;
      }
      const view = new window.google.picker.DocsView(window.google.picker.ViewId.FOLDERS)
        .setParent("root")
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true);
      const picker = new window.google.picker.PickerBuilder()
        .setOAuthToken(accessToken.value)
        .setDeveloperKey(API_KEY)
        .addView(view)
        .setCallback((data: any) => {
          if (data.action === window.google.picker.Action.PICKED) {
            const folder = data.docs[0];
            const folderId = folder.id;
            tabData.value[activeTabIdx.value].folder = folder.name;
            tabData.value[activeTabIdx.value].folderId = folderId;
          }
        })
        .build();
      picker.setVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const save = async (tabIdx: number) => {
    try {
      const tab = tabData.value[tabIdx];
      const growthData = tab?.growthData;
      if (!growthData) return console.error("Cannot find growthData");

      tokenClient.value = await getClient();

      if (!accessToken.value) {
        accessToken.value = (await getToken({ prompt: "consent" })).access_token;
      }

      const form = new FormData();
      const filename = getFilename(tab);
      form.append(
        "metadata",
        new Blob(
          [
            JSON.stringify({
              name: filename,
              parents: tab.folderId ? [tab.folderId] : undefined,
              mimeType: "application/json",
            }),
          ],
          {
            type: "application/json",
          },
        ),
      );
      form.append("file", new Blob([JSON.stringify(growthData)], { type: "application/json" }));

      await axios.post("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id", form, {
        headers: {
          Authorization: "Bearer " + accessToken.value,
        },
      });
      toastStore.show({
        severity: "success",
        summary: "Success",
        detail: `"${filename}" has been saved to Google Drive`,
      });
    } catch (error) {
      accessToken.value = "";
      save(tabIdx);
    }
  };

  return { launchPicker, launchFolderPicker, save };
});
