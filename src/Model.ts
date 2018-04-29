
import { hierarchy, HierarchyLink } from "d3-hierarchy"

export interface ModelHierarchyNode<Datum> {
  data: Datum;
  readonly depth: number;
  readonly height: number;
  parent: ModelHierarchyNode<Datum> | null;
  children?: Array<ModelHierarchyNode<Datum>>;
  targets?: Array<string>;
  /**
   * Aggregated numeric value as calculated by sum(value) or count(),
   * if previously invoked.
   */
  readonly value?: number;
  /**
   * Optional Node Id string set by StratifyOperator, if
   * hierarchical data was created from tabular data using stratify()
   */
  readonly id?: string;
  ancestors(): Array<ModelHierarchyNode<Datum>>;
  descendants(): Array<ModelHierarchyNode<Datum>>;
  leaves(): Array<ModelHierarchyNode<Datum>>;
  path(target: ModelHierarchyNode<Datum>): Array<ModelHierarchyNode<Datum>>;
  links(): Array<HierarchyLink<Datum>>;
  sum(value: (d: Datum) => number): this;
  count(): this;
  sort(compare: (a: ModelHierarchyNode<Datum>, b: ModelHierarchyNode<Datum>) => number): this;
  each(func: (node: ModelHierarchyNode<Datum>) => void): this;
  eachAfter(func: (node: ModelHierarchyNode<Datum>) => void): this;
  eachBefore(func: (node: ModelHierarchyNode<Datum>) => void): this;
  copy(): ModelHierarchyNode<Datum>;
}

export interface NodeData {
  name: string | string[];
  abbr?: string;
  children?: NodeData[];
}

export interface LinkData {
  name?: string;
  source: string;
  target: string | string[];
  type: 1|2|3|4;
}

function getNodeKey( data: NodeData ) {
  return data.abbr
      || (typeof data.name === 'string' ? data.name : data.name[0] );
}

export default class Model {
  readonly root: ModelHierarchyNode<NodeData>;
  readonly links: LinkData[];
  
  private readonly nameMap: Map<string,ModelHierarchyNode<NodeData>>;

  constructor( root: NodeData, links: LinkData[] ) {
    this.root = hierarchy(root) as ModelHierarchyNode<NodeData>;

    let nm = this.nameMap = new Map<string,ModelHierarchyNode<NodeData>>();
    this.root.each( node => {
      let names = node.data.name;
      if( typeof names === 'string' ){
        names = [names];
      }
      if( node.data.abbr ) names.push(node.data.abbr);

      names.forEach( name => {
        let n = nm.get(name);
        if( n && n !== node ){
          console.warn("name collision!!!");
        } else {
          nm.set( name, node );
        }
      });
    });

    this.links = links;
  }

  getNode( name:string ): ModelHierarchyNode<NodeData> {
    return this.nameMap.get(name);
  }

  /*

  */
  getTargets( node:ModelHierarchyNode<NodeData> ){
    while( node && !node.targets ){
      node = node.parent;
    }
  }
}