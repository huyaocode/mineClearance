import Director from "./director/Director";
import DirectorEasy from "./director/DirectorEasy";

let director: Director = null

director = new DirectorEasy()
director.construct('app')