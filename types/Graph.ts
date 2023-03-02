export interface IGraphSkill {
  axis: string;
  value: number;
  order: number;
}
export interface IGraphData {
  name?: string;
  skills: ComputedRef<IGraphSkill[]>;
  color: string;
}
