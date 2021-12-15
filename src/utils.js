async function loadSWC(path) {
  const resp = await fetch(path)
  const lines = await resp.text()
  let hash = {}
  let neuron = lines
    .split('\n')
    .filter((line) => !line.startsWith('#') && line)
    .map((line, i) => {
      let [n, type, x, y, z, r, parent] = line.split(' ')
      n = Number(n)
      type = Number(type)
      parent = Number(parent)
      hash[n] = i
      return {
        n,
        type,
        x: -x * 25 + 6600,
        y: -y * 25 + 4000,
        z: -z * 25 + 5700,
        r: r * 25,
        parent,
        parent_index: null,
        index: i,
        children: [],
      }
    })
  neuron.forEach((node, i) => {
    if (hash.hasOwnProperty(node.parent)) {
      node.parent_index = hash[node.parent]
      neuron[node.parent_index].children.push(i)
    }
  })
  return neuron
}

function computeTraversal(neuron) {
  let fromRoot = [],
    toRoot = [],
    traversal = []

  function dfs({ children, x, y, z, type }) {
    traversal.push([x, y, z])
    if (children.length) {
      children.forEach((index) => dfs(neuron[index]))
    } else {
      if (type === 2) fromRoot.push(traversal.concat())
      else toRoot.push(traversal.concat().reverse())
    }
    traversal.pop()
  }
  neuron.filter(({ parent }) => parent === -1).forEach((node) => dfs(node))
  return { fromRoot, toRoot }
}

function longestTraversal(neuron) {
  const { fromRoot, toRoot } = computeTraversal(neuron)
  // return [...toRoot.reduce((a, b) => (a.length > b.length ? a : b)), ...fromRoot.reduce((a, b) => (a.length > b.length ? a : b))]
  return fromRoot.reduce((a, b) => (a.length > b.length ? a : b))
}

function computeSkeleton(neuron) {
  let skeleton = {}

  // compute skeleton based on dfs
  function dfs(node) {
    node.children.forEach((child) => {
      let farNode = neuron[child]
      let traversal = [
        [node.x, node.y, node.z],
        [farNode.x, farNode.y, farNode.z],
      ]
      while (farNode.children.length === 1) {
        farNode = neuron[farNode.children[0]]
        traversal.push([farNode.x, farNode.y, farNode.z])
      }
      skeleton[farNode.index] = {
        traversal,
        far: farNode.index,
        near: node.index,
        children: [],
        // terminal types: axon/2, dendrite/3, apical/4
        types: farNode.children.length === 0 ? [neuron[farNode.index].type] : [],
      }
      if (farNode.children.length > 0) dfs(farNode)
    })
  }

  // compute skeleton
  neuron
    .filter(({ parent }) => parent === -1)
    .forEach((node) => {
      skeleton[node.index] = {
        traversal: [[node.x, node.y, node.z]],
        far: node.index,
        near: null,
        children: [],
        types: [node.index.type],
      }
      dfs(node)
    })
  // tagging children, for roots that have null near node, skip
  for (let index in skeleton) {
    const { far, near } = skeleton[index]
    if (skeleton.hasOwnProperty(near)) skeleton[near].children.push(far)
  }
  // tagging termination from tip to soma, based on bfs
  function bfs(tips) {
    let que = tips
    while (que.length > 0) {
      const { types, near } = skeleton[que.shift()]
      if (near === null) continue
      let flag = false
      types.forEach((type) => {
        if (!skeleton[near].types.includes(type)) {
          skeleton[near].types.push(type)
          flag = true
        }
      })
      if (flag && !que.includes(near)) que.push(near)
    }
  }
  bfs(Object.keys(skeleton).filter((index) => skeleton[index].children.length === 0))
  return skeleton
}

// function decomposeSkeleton(neuron) {
//   let degenAxonAbor = {},
//     degenDendriteAbor = {},
//     dendriteTip = [],
//     axonTip = [],
//     skeleton = {}

//   function dfs(node) {
//     node.children.forEach((child) => {
//       let farNode = neuron[child]
//       let traversal = [
//         [node.x, node.y, node.z],
//         [farNode.x, farNode.y, farNode.z],
//       ]
//       while (farNode.children.length === 1) {
//         farNode = neuron[farNode.children[0]]
//         traversal.push([farNode.x, farNode.y, farNode.z])
//       }
//       // let curve = new THREE.CatmullRomCurve3(traversal.map((pos) => new THREE.Vector3(...pos)))
//       skeleton[farNode.index] = { traversal, far: farNode.index, near: node.index }
//       if (farNode.children.length === 0) {
//         if (farNode.type === 2) {
//           let temp1 = farNode.index
//           while (skeleton.hasOwnProperty(temp1)) {
//             let temp2 = skeleton[temp1].near
//             if (!degenAxonAbor.hasOwnProperty(temp2)) degenAxonAbor[temp2] = new Set()
//             degenAxonAbor[temp2].add(temp1)
//             temp1 = temp2
//           }
//           axonTip.push(farNode.index)
//         } else {
//           let temp1 = farNode.index
//           while (skeleton.hasOwnProperty(temp1)) {
//             let temp2 = skeleton[temp1].near
//             if (!degenDendriteAbor.hasOwnProperty(temp2)) degenDendriteAbor[temp2] = new Set()
//             degenDendriteAbor[temp2].add(temp1)
//             temp1 = temp2
//           }
//           dendriteTip.push(farNode.index)
//         }
//       } else dfs(farNode)
//     })
//   }
//   neuron.filter(({ parent }) => parent === -1).forEach((node) => dfs(node))
//   return { degenAxonAbor, degenDendriteAbor, axonTip, dendriteTip, skeleton }
// }

export { loadSWC, computeSkeleton, longestTraversal }
