const telencephalon = {
  name: "Telencephalon",
  children: [
    {
      name: "Subcortical",
      children: [
        {
          name: "Hippocampus"
        },{
          name: "Basal Ganglia",
          children: [
            {
              name: "Striatum",
              children: [
                {
                  name: "Caudate Nucleus"
                },{
                  name: "Lentiform Nucleus",
                  children: [
                    {
                      name: "Putamen"
                    },{
                      name: "Globus Pallidus",
                      abbr: "GP",
                      children: [
                        {
                          name: "External",
                          abbr: "GPe"
                        },{
                          name: "Internal",
                          abbr: "GPi"
                        }]
                    }]
                },{
                  name: "Nucleus Accumbens",
                  abbr: "NAc"
                },{
                  name: "Olfactory Tubercle",
                  abbr: "OT"
                }]
            }
          ]
        }
      ]
    },{
      name: "Rhinencephalon",
      children: [
        {
          name: "Olfactory Bulb"
        },{
          name: "Anterior Olfactory Nucleus"
        },{
          name: "Piriform Cortex"
        },{
          name: "Uncus"
        },{
          name: "Periamygdaloid Cortex"
        }
      ]
    },{
      name: "Cortex",
      children: [
        {
          name: "Frontal Lobe",
          children: [
            {
              name: "Prefrontal Cortex",
              abbr: "PFC",
              children: [
                {
                  name: "Medial PFC",
                  abbr: "mPFC"
                },{
                  name: "Orbitofrontal Cortex",
                  abbr: "OFC"
                },{
                  name: "Ventrolateral PFC",
                  abbr: "vlPFC"
                },{
                  name: "Dorsolateral PFC",
                  abbr: "dlPFC"
                },{
                  name: "Caudal PFC",
                  abbr: "cPFC"
                }
              ]
            },{
              name: "Superior Frontal Cortex",
              abbr: "SFG",
              children: [
                {
                  name: "Laterial SFG"
                },{
                  name: "Medial SFG"
                }
              ]
            },{
              name: "Middle Frontal Cortex"
            },{
              name: "Precentral Cortex",
              abbr: "PCC"
            }
          ]
        },{
          name: "Parietal Lobe",
          children: [
            {
              name: "Postcentral Gyrus",
              alias: ["Anterior Parietal Lobe"]
            },{
              name: "Inferior Parietal Lobule"
            },{
              name: "Superior Parietal Lobule"
            },{
              name: "Precuneus",
              alias: ["Medial Parietal Lobe"]
            }
          ]
        },{
          name: "Occipital Lobe"
        },{
          name: "Temporal Lobe"
        },{
          name: "Limbic Lobe",
          children: [
            {
              name: "Cingulate Cortex",
              abbr: "Cg"
            }
          ]
        },{
          name: "Insular Lobe"
        }
      ]
    }
  ]
};

export default telencephalon;