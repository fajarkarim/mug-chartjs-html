
const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

const CHART_COLORS_OPACITY = {
    red: 'rgb(255, 99, 132, 0.5)',
    orange: 'rgb(255, 159, 64, 0.5)',
    yellow: 'rgb(255, 205, 86, 0.5)',
    green: 'rgb(75, 192, 192, 0.5)',
    blue: 'rgb(54, 162, 235, 0.5)',
    purple: 'rgb(153, 102, 255, 0.5)',
    grey: 'rgb(201, 203, 207, 0.5)'
};

async function loadJumlahCalegPerDapil() {
    try {
        let { data : { documents } } = await fetchCalegPerDapil()
        showCalegPerDapil(documents)
    } catch (error) {
        throw error
    }
}

async function loadAvgUsiaCaleg() {
  try {
      let { data : { documents } } = await fetchAvgUsiaCalegChart()
      showAvgUsiaCaleg(documents)
  } catch (error) {
      throw error
  }
}

async function loadPriaWanitaDapil1Chart() {
  try {
      let { data : { documents } } = await fetchPriaWanitaDapil1Chart()
      showPriaWanitaDapil1Chart(documents)
  } catch (error) {
      throw error
  }
}

async function loadTotalCandidate() {
  try {
      let { data : { documents } } = await fetchTotalCandidateChart()
      showTotalCandidate(documents)
  } catch (error) {
      throw error
  }
}

async function loadAgamaCandidate() {
  try {
      let { data : { documents } } = await fetchAgamaCandidateChart()
      showTotalAgamaCandidate(documents)
  } catch (error) {
      throw error
  }
}

function showCalegPerDapil(responseData) {
    
    let slicedData = responseData.slice(0, 100)
    let parsedLabels = slicedData.map(document => `${document._id.partai}/${document._id.dapil}`)
    let parsedDataLaki = slicedData.map(document => document.total_caleg_laki_laki)
    let parsedDataPerempuan = slicedData.map(document => document.total_caleg_perempuan)

    const context = document.getElementById('calegPerDapil')
    const labels = parsedLabels
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Laki - Laki',
                data: parsedDataLaki,
                backgroundColor: 'rgb(54, 162, 235)',
            },
            {
                label: 'Perempuan',
                data: parsedDataPerempuan,
                backgroundColor: 'rgb(255, 99, 132)',
            }
        ]
    };
    const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                title: {
                    display: true,
                    text: 'Jumlah Caleg per Partai/Dapil'
                },
                },
                responsive: true,
                scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
                }
            }
            };
    new Chart(context, config);
}

function showPriaWanitaDapil1Chart(responseData) {
    
    let slicedData = responseData.slice(0, 50)
    let parsedLabels = slicedData.map(document => `${document.party}`)
    let parsedDataLaki = slicedData.map(document => {
        let filtered = document.candidates.filter(candidate => candidate.gender.toLowerCase() == "laki-laki")
        let totalCount = filtered[0] ? filtered[0].count : 0
        return totalCount
    })
    let parsedDataPerempuan = slicedData.map(document => {
        let filtered = document.candidates.filter(candidate => candidate.gender.toLowerCase() == "perempuan")
        let totalCount = filtered[0] ? filtered[0].count : 0
        return totalCount
    })

    const context = document.getElementById('priaWanitaDapil1Chart')
    const labels = parsedLabels
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Laki-Laki',
                data: parsedDataLaki,
                backgroundColor: 'rgb(54, 162, 235)',
            },
            {
                label: 'Perempuan',
                data: parsedDataPerempuan,
                backgroundColor: 'rgb(255, 99, 132)',
            }
        ]
    };
    const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Jumlah Laki-laki & Perempuan per Partai di Dapil 1 Jakarta'
                  }
                }
              },
            };
    new Chart(context, config);
}

function showAvgUsiaCaleg(responseData) {
    
    let slicedData = responseData.slice(0, 100)
    let parsedLabels = slicedData.map(document => document._id)
    let parsedData = slicedData.map(document => document.usia_avg)

    const context = document.getElementById('avgUsiaCalegChart')
    const labels = parsedLabels
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Rata2 Umur',
                data: parsedData,
                backgroundColor: Object.values(CHART_COLORS),
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Rata-rata umur caleg per partai di Dapil 1 Jakarta'
                  }
                }
              },
            };
    new Chart(context, config);
}

function showTotalCandidate(responseData) {
    // responseData = [
		// {
		// 	"_id": "Partai NasDem",
		// 	"total_candidates": 4
		// },
		// {
		// 	"_id": "Partai Hati Nurani Rakyat",
		// 	"total_candidates": 6
		// },
		// {
		// 	"_id": "Partai Bulan Bintang",
		// 	"total_candidates": 6
		// },
		// {
		// 	"_id": "PARTAI PERINDO",
		// 	"total_candidates": 6
		// },
		// {
		// 	"_id": "Partai Kebangkitan Nusantara",
		// 	"total_candidates": 5
		// }
    // ]
    
    let slicedData = responseData.slice(0, 50)
    let parsedLabels = slicedData.map(document => document._id)
    let parsedData = slicedData.map(document => document.total_candidates)

    const context = document.getElementById('totalCandidateChart')
    const labels = parsedLabels
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total kandidat',
                data: parsedData,
                backgroundColor: Object.values(CHART_COLORS_OPACITY)
            }
        ]
    };
    const config = {
            type: 'polarArea',
            data: data,
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Total Kandidat Per Partai'
                  }
                }
              },
            };
    new Chart(context, config);
}

function showTotalAgamaCandidate(responseData) {
    
    let slicedData = responseData.slice(0, 50)
    let parsedLabels = slicedData.map(document => document._id)
    let parsedData = slicedData.map(document => document.total_candidates)

    const context = document.getElementById('agamaCandidateChart')
    const labels = parsedLabels
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total kandidat',
                data: parsedData,
                backgroundColor: [
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)'
                ]
            }
        ]
    };
    const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Total Agama Kandidat Per Partai'
                  }
                }
              },
            };
    new Chart(context, config);
}

loadJumlahCalegPerDapil()
loadAvgUsiaCaleg()
loadPriaWanitaDapil1Chart()
loadTotalCandidate()
loadAgamaCandidate()

