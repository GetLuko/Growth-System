<template>
  <Tree :value="docs" :expandedKeys="expandedKeys" class="!border-0 mt-[64px] min-h-[calc(100vh-64px)]">
    <template #default="slotProps">
      {{ slotProps.node.label }}
    </template>
    <template #url="slotProps">
      <a :href="slotProps.node.data" target="_blank">
        {{ slotProps.node.label }}
      </a>
    </template>
  </Tree>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Tree from "primevue/tree";

const expandedKeys: any = ref({});
const docs = [
  {
    key: "0",
    label: "Luko Growth System",
    icon: "pi pi-fw pi-folder",
    children: [
      {
        key: "growth-system-intro",
        label: "Intro",
        data: "https://luko.notion.site/Lukogrowth-Framework-c55e4c1e113c4acda1f32f1bad275d12",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "engineering",
        label: "Engineering",
        data: "https://luko.notion.site/Engineering-Growth-Track-0e160fee19df42789be55a23bc83f3a8",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "execution",
        label: "Execution",
        data: "https://luko.notion.site/Execution-Growth-Track-e6d072e1ac5b4e518bc2e916eea0f999",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "supporting",
        label: "Supporting",
        data: "https://luko.notion.site/Supporting-Growth-Track-3cc636233d624f6d861e542fca0af142",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "strengthening",
        label: "Strengthening",
        data: "https://luko.notion.site/Strengthening-Growth-Track-f885547be9a74a1f86412fae3e3366ef",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "data_analytics",
        label: "Data Analytics",
        data: "https://www.notion.so/luko/Analytics-Growth-Track-908451d465894c468c1078c9fff67b70",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
    ],
  },
  {
    key: "1",
    label: "Luko Ladder",
    icon: "pi pi-fw pi-folder",
    children: [
      {
        key: "ladder-intro",
        label: "Intro",
        data: "https://luko.notion.site/Lukoladder-40af62829d9a43bf920b522e57f53eac",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "makers",
        label: "Makers",
        icon: "pi pi-fw pi-inbox",
        children: [
          {
            key: "engineer-i",
            label: "Engineer I",
            data: "https://luko.notion.site/Engineer-I-fde0f9d3c8834390974a2fb965f7c3b6",
            type: "url",
            icon: "pi pi-fw pi-link",
          },
          {
            key: "engineer-ii",
            label: "Engineer II",
            data: "https://luko.notion.site/Engineer-II-1326e730b87c40dc87b9d015d5b8e68f",
            type: "url",
            icon: "pi pi-fw pi-link",
          },
          {
            key: "senior-engineer",
            label: "Senior Engineer",
            data: "https://luko.notion.site/Senior-Engineer-8c7c09c68f9e49d386dbbeb39bb89782",
            type: "url",
            icon: "pi pi-fw pi-link",
          },
          {
            key: "staff-engineer",
            label: "Staff Engineer",
            data: "https://luko.notion.site/Staff-Engineer-7f6d201898a242c893cc6b0e69c4d0a5",
            type: "url",
            icon: "pi pi-fw pi-link",
          },
          {
            key: "principal-engineer",
            label: "Principal Engineer",
            data: "https://luko.notion.site/Principal-Engineer-4fe20d0ea3ca4baa9e7bbc70a1cd732b",
            type: "url",
            icon: "pi pi-fw pi-link",
          },
          {
            key: "distinguished-engineer",
            label: "Distinguished Engineer",
            data: "https://luko.notion.site/Distinguished-Engineer-859d5a01208f473aacfd7678ba486736",
            type: "url",
            icon: "pi pi-fw pi-link",
          },
        ],
      },
      {
        key: "managers",
        label: "Managers",
        icon: "pi pi-fw pi-inbox",
        children: [
          {
            key: "engineering-lead",
            label: "Engineering Lead (EL)",
            data: "https://luko.notion.site/Engineering-Lead-EL-5623d016ffa6487592214ef756cc0e09",
            type: "url",
            icon: "pi pi-fw pi-link",
          },
          {
            key: "engineering-manager",
            label: "Engineering Manager (EM)",
            data: "https://luko.notion.site/Engineering-Manager-EM-0b517c5f66bf411b98dede4d878ff51b",
            type: "url",
            icon: "pi pi-fw pi-link",
          },
          {
            key: "senior-engineering-manager",
            label: "Senior Engineering Manager (SEM)",
            data: "https://luko.notion.site/Senior-Manager-Engineering-SEM-d772edcc05424360bc2770dec487093d",
            type: "url",
            icon: "pi pi-fw pi-link",
          },
          {
            key: "vp-engineering",
            label: "VP of Engineering (VPE)",
            data: "https://luko.notion.site/VP-of-Engineering-VPE-440a54917cbf47559a17fe0113313c6f",
            type: "url",
            icon: "pi pi-fw pi-link",
          },
        ],
      },
    ],
  },
  {
    key: "3",
    label: "Useful info and tools",
    icon: "pi pi-fw pi-folder",
    children: [
      {
        key: "info-tools-intro",
        label: "Intro",
        data: "https://luko.notion.site/Useful-info-and-tools-553f33d467c84c04a33c5492ff610132",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "growth-system-faq",
        label: "Growth system FAQ",
        data: "https://luko.notion.site/Growth-System-FAQ-b85a1d714cde41718da3ebaeed812990",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "manager-path",
        label: "Taking on the managers path",
        data: "https://luko.notion.site/Taking-on-the-managers-path-86bdcbe9d18a4526b259cb7d9c53b3ae",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "growth-thinking-trigger",
        label: "Growth thinking trigger 🧠",
        data: "https://luko.notion.site/Growth-thinking-trigger-1e4dedc8768145fdba027e52acf55893",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "map-luko-ladder",
        label: "How do you map yourself to the Luko Ladder",
        data: "https://luko.notion.site/How-do-you-map-yourself-to-the-Lukoladder-5fee14431aca420f87c85260aa0d71a2",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "map-evaluation",
        label: "Mapping evaluation process",
        data: "https://luko.notion.site/Mapping-evaluation-process-1f86614b6cdc4dcca7fda499de12c40d",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "okr-solid-growth",
        label: "[OKRs] Ensuring solid career growth",
        data: "https://luko.notion.site/OKRs-Ensuring-solid-career-growth-c68eafab7f0d47618cd808de915ea830",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "okr-growth-plan",
        label: "[OKRs] What does a growth plan look like?",
        data: "https://luko.notion.site/OKRs-What-does-a-growth-plan-look-like-5880e3d4e68d4c78974acc2cc98b0969",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
      {
        key: "feedback-and-advice",
        label: "Regularly seek feedback and advice",
        data: "https://luko.notion.site/Regularly-seek-feedback-and-advice-05dd8e2723904d0d91d7bec31acb5a37",
        type: "url",
        icon: "pi pi-fw pi-link",
      },
    ],
  },
];
const expandNode = (node: any) => {
  if (node.children && node.children.length) {
    expandedKeys.value[node.key] = true;

    for (let child of node.children) {
      expandNode(child);
    }
  }
};

const expandAll = () => {
  for (let node of docs) {
    expandNode(node);
  }

  expandedKeys.value = { ...expandedKeys.value };
};

// expand tree by default
expandAll();
</script>
