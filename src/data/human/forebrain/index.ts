import diencephalon from "./diencephalon"
import telencephalon from "./telencephalon";

const forebrain = {
  name: "Prosencephalon",
  //alias: ['forebrain'],
  children: [diencephalon, telencephalon]
};

export default forebrain;