//import myelencephalon from "./myelencephalon";
//import metencephalon from "./metencephalon";

const midbrain = {
  name: "Mesencephalon",
  //alias: ['mesencephalon'],
  children: [
    {
      name: "Tectum",
      children: [
        {
          name: "Inferior Colliculi"
        },{
          name: "Superior Colliculi"
        }
      ]
    },{
      name: "Pretectum"
    },{
      name: "Tegmentum",
      children: [
        {
          name: "Periaqueductal Gray",
          abbr: "PAG"
        },{
          name: "rostral interstitial nucleus of medial longitudinal fasciculus",
          abbr: "riMLF"
        },{
          name: "Midbrain Reticular Formation",
          abbr: "MRF"
        },{
          name: "Dorsal Raphe Nucleus",
          abbr: "DR"
        },{
          name: "Red Nucleus"
        },{
          name: "Ventral Tegmental Area",
          abbr: "VTA"
        },{
          name: "Substantia Nigra",
          abbr: "SN",
          children: [
            {
              name: "Pars Reticulata",
              abbr: "SNr"
            },{
              name: "Pars Compacta",
              abbr: "SNc"
            }]
        },{
          name: "Interpeduncular Nucleus",
          abbr: "IPN"
        }
      ]
    }
  ]
};

export default midbrain;