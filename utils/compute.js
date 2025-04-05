import {fcfs, sjf, npp,srtf, rr, pp} from "./algorithms"

export default function compute(processes, algorithm, timeQuantum){
    let result = null;
    switch(algorithm) {
        case "fcfs":
            result = fcfs(processes);
            break;
        case "sjf":
            result = sjf(processes);
            break;
        case "npp":
            result = npp(processes);
            break;
        case "srtf":
            result = srtf(processes);
            break;
        case "rr":
            result = rr(processes, timeQuantum);
            break;
        case "pp":
            result = pp(processes);
            break;
        default:
            throw new Error("Unknown algorithm: " + algorithm);
    }
    return result;
}