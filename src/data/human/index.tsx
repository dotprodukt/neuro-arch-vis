
import hindbrain from "./hindbrain";
import midbrain from "./midbrain";
import forebrain from "./forebrain";

export type NodeData = { name:string, abbr?:string, children?:NodeData[], alias?:string[] };
type LinkData = { source:string, target:string, type:1|2|3|4 };

export const nodeData: NodeData = {
  name: "root",
  children: [
    hindbrain, midbrain, forebrain
  ]
};

export const linkData: LinkData[] = [
  //{ source: "Putamen", target: "GPi", type: 2 },
  { source: "Cortex", target: "Caudate Nucleus", type: 1 },
  { source: "Cortex", target: "Putamen", type: 1 },
  { source: "Caudate Nucleus", target: "SNr", type: 2 },
  { source: "Caudate Nucleus", target: "GPi", type: 2 },
  { source: "Caudate Nucleus", target: "GPe", type: 2 },
  { source: "Putamen", target: "Caudate Nucleus", type: 2 },
  { source: "Putamen", target: "SNr", type: 2 },
  { source: "Putamen", target: "GPi", type: 2 },
  { source: "Putamen", target: "GPe", type: 2 },
  { source: "GPe", target: "STN", type: 2 },
  { source: "GPi", target: "Thalamus", type: 2 },
  { source: "SNc", target: "Caudate Nucleus", type: 3 },
  { source: "SNc", target: "Putamen", type: 3 },
  { source: "SNc", target: "Caudate Nucleus", type: 4 },
  { source: "SNc", target: "Putamen", type: 4 },
  { source: "SNr", target: "Thalamus", type: 2 },
  { source: "STN", target: "SNr", type: 1 },
  //{ source: "Thalamus", target: "Cortex", type: 1 },
  { source: "AN", target: "Cg", type: 1 },
  { source: "MD", target: "OFC", type: 1 },

  { source: "Superior Parietal Lobule", target: "Frontal Lobe", type: 1 }, // SLF I
  { source: "Precuneus", target: "Frontal Lobe", type: 1 }, // SLF I
  { source: "Parietal Lobe", target: "Dorsolateral PFC", type: 1 } // SLF II
];

