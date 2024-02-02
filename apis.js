const URL = "https://mug-be-s6yr52twf4su.runkit.sh/"

function fetchCalegPerDapil () {

    const options = {
        "method": "POST",
        "url": URL,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": {
          "collection": "caleg_2019_2024",
          "pipeline": pipelines.calegPerDapil
        }
      };

    return axios.request(options)
}

function fetchAvgUsiaCalegChart () {

    const options = {
        "method": "POST",
        "url": URL,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": {
          "collection": "dapil_1_jakarta",
          "pipeline": pipelines.avgUsiaCalegChart
        }
      };

    return axios.request(options)
}

function fetchPriaWanitaDapil1Chart () {

    const options = {
        "method": "POST",
        "url": URL,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": {
          "collection": "dapil_1_jakarta",
          "pipeline": pipelines.priaWanitaDapil1Chart
        }
      };

    return axios.request(options)
}

function fetchTotalCandidateChart () {

    const options = {
        "method": "POST",
        "url": URL,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": {
          "collection": "dapil_1_jakarta",
          "pipeline": pipelines.totalCandidateChart
        }
      };

    return axios.request(options)
}

function fetchAgamaCandidateChart () {

    const options = {
        "method": "POST",
        "url": URL,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": {
          "collection": "dapil_1_jakarta",
          "pipeline": pipelines.agamaCandidateChart
        }
      };

    return axios.request(options)
}