import { NodeData, linkData as links, nodeData as data } from "./data/human";
import {hierarchy,cluster,partition,HierarchyNode} from "d3-hierarchy";
import {radialLine,curveBundle,arc} from "d3-shape";
import { select, mouse as getMouse, Selection } from "d3-selection";
import { interpolateCubehelix } from "d3-interpolate";

import { interpolateRainbow } from "d3-scale-chromatic";
import { ribbon as ribbonFactory, RibbonSubgroup } from "d3-chord";
//import {} from "d3-path"
import "./style/base.less";

import { createStore } from "redux";

import reducer from "./reducer";

const store = createStore(reducer,undefined);


type NodeType = HierarchyNode<NodeData> & RibbonSubgroup & {x:number,y:number,x0:number,x1:number,y0:number,y1:number,color:string};

const root:NodeType = hierarchy<NodeData>(data) as NodeType;

const nodeMap = new Map();
function setNodeKey( node, key ){
  if( nodeMap.has(key) ){
    console.log("name collision")
  } else {
    nodeMap.set( key, node );
  }
}
root.each( node => {
  setNodeKey( node, node.data.name );
  if( node.data.abbr ) setNodeKey( node, node.data.abbr );
});

links.forEach( link => {
  let src = nodeMap.get(link.source);
  let targets = src.targets || (src.targets = []);
  targets.push({ key: link.target, type: link.type });
});

const radius = 400;
const innerRadius = radius*0.5;

const clusterLayout = cluster()
  .size([2.0*Math.PI,innerRadius])
  .separation( d => 1 );

const partitionLayout = partition()
  .size([2.0*Math.PI,innerRadius]);

root.count();
//root.sort((a,b)=>a.value-b.value);
clusterLayout(root);
partitionLayout(root);

root.each( node => {
  if( node === root ) return
  let n = node as NodeType;
  let rh = innerRadius - (node.parent as NodeType).y;
  let f = Math.pow(1.0/(node.height+1),1);
  n.y = (node.parent as NodeType).y + (rh * f);
  //let h = n.y / innerRadius;
  //n.y = Math.pow(h,1.5)*innerRadius;
  /*n.x0 += 0.03 / n.depth;
  n.x1 -= 0.03 / n.depth;
  if( node.parent !== root ){
    if( node === node.parent.children[0] ){
      n.x0 = (node.parent as NodeType).x0;
    }
    if( node === node.parent.children[node.parent.children.length-1] ){
      n.x1 = (node.parent as NodeType).x1;
    }
  }
  n.x = (n.x0+n.x1)*0.5;*/
});

root.each( node => {
  let n = node as NodeType;
  if( n === root ) return;
  let v = n.x/(Math.PI*2.0);
  //v = Math.random();
  //console.log(v);
  //console.log(n.x0,n.x1);
  if( n.parent === root ){
    n.color = interpolateRainbow(v);
  } else {
    //let col = interpolateRainbow(v);
    let col = interpolateCubehelix(interpolateRainbow(v),(n.parent as NodeType).color)(0.25);
    n.color = col;
  }
});



let vedges = [];
let hedges = [];
let eps = 0.00001;
let dups = 0;
const round = Math.round;
function getVEdgeIndex( v:number ): number {
  let k = round(v*1000);
  v = k/1000;

  let i = vedges.indexOf(v);
  if( i == -1 ){
    i = vedges.push(v)-1;
  } else {
    dups++;
  }

  return i;
}
function getHEdgeIndex( v:number ): number {
  let k = round(v*1000);
  v = k/1000;

  let i = hedges.indexOf(v);
  if( i == -1 ){
    i = hedges.push(v)-1;
  } else {
    dups++;
  }

  return i;
}
root.each( node => {
  //if( node == root ) return;
  let n = node as NodeType;
  n.y = getHEdgeIndex(n.y);
  n.x = getVEdgeIndex(n.x);
  n.x0 = getVEdgeIndex(n.x0);
  n.x1 = getVEdgeIndex(n.x1);
});
let vedges2 = vedges.slice();
let hedges2 = hedges.slice();
console.log(dups,"duplicate edges saved");
console.log(vedges.length+hedges.length,"total edges");
//console.log(interpolateRainbow(0.5));

console.dir(nodeMap);

const ribbonGen = ribbonFactory()
  .startAngle( d => (d as NodeType).x )
  .endAngle( d => (d as NodeType).x )
  .radius(innerRadius);

const line = radialLine<NodeType>()
.curve(curveBundle.beta(0.85))
.radius( d => hedges2[d.y] )
.angle( (d,i,arr) => {
  //return d.x+(Math.random()-0.5)/(d.depth*d.depth+4)
  if( d.children ){
    if( d == root ) return 0;
    let x = vedges2[d.x];
    return x;
  } else {
    let x0 = vedges2[d.x0];
    let x1 = vedges2[d.x1];
    if( x1 < x0 ) x1 += PI2;
    let r = Math.random()*0.5+0.25;
    let w = (x1-x0)*0.5;
    return r*w + x0 + (i==0?0:w);
  }
});

let zoomFac = 1.0;
let focus = [0,0];
const pow = Math.pow;
function remapExp( x,u,v,b,c ){
  let f = (x-u)/(v-u);
  b = pow(f,c)*(b-1)+1;
  return (v-u)*pow(f,b)+u;
}

function zoomRemap( y ){
  return y < focus[1] ? remapExp( y, 0,focus[1], 2,1 ) : y >= innerRadius ? y : remapExp( y, innerRadius, focus[1], 2,1 );
}

const PI = Math.PI;
const PI2 = Math.PI*2;

function fmod( n, m ){
  return n - Math.floor(n/m)*m;
}

function angleDiff( a, b ){
  return fmod(a-b+PI,PI2)-PI;
}

function angleRemap( x ){
  // return x;
  if( x == PI2) x-=0.0001;
  //x = fmod(x,PI2)
  let d = angleDiff( x, focus[0] );
  let e = (focus[1]/innerRadius)*1.5+1.0;
  //return d;
  return ((d < 0) ? remapExp(d,-PI,0,e,1) : remapExp(d,PI,0,e,1)) + focus[0];
}

function updateEdges(){
  let vcount = vedges.length;
  let hcount = hedges.length;

  for( let i=0; i<vcount; ++i ){
    vedges2[i] = angleRemap(vedges[i]);
  }

  for( let i=0; i<hcount; ++i ){
    hedges2[i] = zoomRemap(hedges[i]);
  }
}

const arcGen = arc<NodeType>()
  //.outerRadius( innerRadius*2 )
  .outerRadius( d => {
    return radius - hedges2[(d.parent as NodeType).y]-0.25;
  })
  .innerRadius( d => {
    return radius - hedges2[d.y]+0.25;
  })
  .startAngle( d => {
    let x0 = vedges2[d.x0];
    //let x1 = angleRemap(d.x1);
    //if( x0 > x1 )  x0 = x0-PI2;
    return x0;
    //return (d.x0 < d.x1) ? x : x-PI2;
  })
  .endAngle( d =>{
    let x0 = vedges2[d.x0];
    let x1 = vedges2[d.x1];
    if( x1 < x0 ) x1 += PI2;
    return x1;
    //return (d.x0 > d.x1) ? x : x-PI2;
  })
  .padAngle( d => 0.0015 )
  .padRadius( radius );

const svg = select('body')
.style("margin",0)
.append('svg')
.style("position","absolute")
.attr('width', "100%" )
.attr('height', "100%" )
.attr('viewBox',[0,0,radius*2.1,radius*2.1].join(" "))
.attr('preserveAspectRatio',"xMidYMid meet")
.append('g')
  .attr('transform',"translate("+radius*1.05+","+radius*1.05+")");

svg.append('circle')
  .attr('r',innerRadius);

let sector = svg.append('g').selectAll(".sector");
let link = svg.append('g').selectAll(".link");
let ribbon = svg.append('g').selectAll(".ribbon");
let node = svg.append('g').selectAll(".node");

const linkColors = ["#f44242","#2d34fc","#f441a3","#b541f4"];

sector = sector
.data(root.descendants().filter( node => node != root ).reverse())
.enter().append('path')
.attr('class', 'sector')
.attr('d',arcGen)
.attr('fill', d => (d as NodeType).color );

svg.on('mousemove',function(d){
  let [x,y] = getMouse(this as SVGGElement);
  let l = Math.sqrt(x*x + y*y);
  x /= l;
  y /= l;
  focus[1] = innerRadius - Math.min(Math.abs(l-innerRadius),innerRadius);
  focus[0] = fmod(Math.atan2(x,-y),PI2);
  //console.log(focus[0]);
  //let h = Math.min(Math.max(l-innerRadius,0)/innerRadius,1);
  //let f = h*0.5 + (1.0-h)*2;
  //zoomFac = f;
  //console.log(angleDiff(focus[0],PI));
  updateEdges();

  sector.attr('d',arcGen);
  link.attr('d',line);
  node
    .attr('transform', d => {
      let n = d as NodeType;
      let x = vedges2[n.x];
      return "rotate(" + (x*(180/Math.PI) - 90) + ")";
    });
  //console.log(zoomFac);
});

let labelCanvas = document.createElement('canvas');
let labelCtx = labelCanvas.getContext('2d');
labelCtx.font = "10px sans-serif";

function getLabelURL( name: string ){
  //labelCtx.font = "15px sans-serif";
  let m = labelCtx.measureText(name);
  let w = m.width;
  labelCanvas.width = w;
  labelCanvas.height = 10;
  labelCtx.font = "10px sans-serif";
  //labelCtx.clearRect(0,0,w,15);
  labelCtx.fillText(name,0,10);
  return labelCanvas.toDataURL();
}

//console.log(getLabelURL("ABC"));
//console.log(labelCanvas);
document.body.appendChild(labelCanvas);

/*ribbon = ribbon
  .data(getOutboundPaths(root.leaves()))
  .enter().append('path')
    .attr('class','ribbon')
    .attr('d',ribbonGen)
    .style('stroke', d => d.source.color );*/

link = link
.data(getOutboundPaths(root.leaves()))
.enter().append('path')
  .attr('class','link')
  .attr('d',line)
  //.style('stroke', d => linkColors[d.type-1] )
  .style('stroke', d => d[0].color )
  .style('animation-duration', d => (Math.random()*0.125+0.2)+'s' );

node = node
.data(root.leaves() as NodeType[])
.enter().append('g')
  .attr('class','node');
  //.attr('dy','0.31em')
(node.append('image') as Selection<SVGGElement,NodeType,SVGImageElement,NodeType>)
  .attr('y',-5)
  .attr('x', d => hedges[d.y]+5 )
  .attr('height',8)
  //.attr('transform', d => "translate(" + (hedges[d.y] + 8) + ",0)" )
  .attr('href', d => getLabelURL(d.data.abbr || d.data.name) );


function getTargets( node ){
  while( node && !node.targets ){
    node = node.parent;
  }
  
  let temp = (node && node.targets) || []
  temp = temp.map( target => {
    let tar = nodeMap.get(target.key);
    if( !tar.children ) return target;
    return tar.leaves().map( leaf => ({ key: leaf.data.name, type: target.type }));
  });
  
  return Array.prototype.concat.apply([],temp);
}

function getOutboundPaths( nodes ){
  let paths = [];
  
  nodes.forEach( node => {
    let tars = getTargets( node );
    tars.forEach( tar => {
      //let p = { source: node, target: nodeMap.get(tar.key), type: tar.type };
      let p = node.path(nodeMap.get(tar.key)).filter( n => n != root );
      p.type = tar.type;
      paths.push(p);
    });
  });
  
  return paths;
}