
const diencephalon = {
  name: "Diencephalon",
  children: [
    {
      name: "Thalamus",
      children: [
        {
          name: "Anterior Nuclear Group",
          abbr: "AN"
        },{
          name: "Medial Dorsal Nucleus",
          abbr: "MD"
        },{
          name: "Midline Nuclear Group",
          abbr: "MNG"
        },{
          name: "Intralaminar Nuclei"
        },{
          name: "Pulvinar",
          abbr: "PUL"
        },{
          name: "Ventral Nuclear Group",
          abbr: "VNG"
        }
      ]
    },{
      name: "Hypothalamus"
    },{
      name: "Subthalamus",
      children: [
        {
          name: "Subthalamic Nucleus",
          abbr: "STN"
        }
      ]
    }
  ]
};

export default diencephalon;