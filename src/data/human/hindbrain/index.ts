import myelencephalon from "./myelencephalon";
import metencephalon from "./metencephalon";

const hindbrain = {
  name: "Rhombencephalon",
  //alias: ['hindbrain'],
  children: [myelencephalon, metencephalon]
};

export default hindbrain;