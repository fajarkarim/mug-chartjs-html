
var pipelines = {
  calegPerDapil : [
    {
      "$group": {
        "_id": {
          "partai": "$partai",
          "dapil": "$dapil"
        },
        "total_caleg_laki_laki": {
          "$sum": "$jumlah_caleg_laki_laki"
        },
        "total_caleg_perempuan": {
          "$sum": "$jumlah_caleg_perempuan"
        },
        "total_caleg": {
          "$sum": {
            "$add": [
              "$jumlah_caleg_laki_laki",
              "$jumlah_caleg_perempuan"
            ]
          }
        }
      }
    }
  ],
  priaWanitaDapil1Chart: [
    {
      "$group": {
        "_id": {
          "party": "$partai",
          "gender": "$jenis_kelamin"
        },
        "total_candidates": {
          "$sum": 1
        }
      }
    },
    {
      "$group": {
        "_id": "$_id.party",
        "candidates": {
          "$push": {
            "gender": "$_id.gender",
            "count": "$total_candidates"
          }
        },
        "total_candidates_per_party": {
          "$sum": "$total_candidates"
        }
      }
    },
    {
      "$project": {
        "_id": 0,
        "party": "$_id",
        "candidates": 1,
        "total_candidates_per_party": 1
      }
    }
  ],
  avgUsiaCalegChart: [
    {
      "$set": {
        "usia": {
          "$regexFind": {
            "input": "$usia",
            "regex": "(\\d+)"
          }
        }
      }
    },
    {
      "$group": {
        "_id": "$partai",
        "usia_avg": {
          "$avg": {
            "$toInt": {
              "$arrayElemAt": [
                "$usia.captures",
                0
              ]
            }
          }
        }
      }
    }
  ],
  totalCandidateChart: [
    {
      "$group": {
        "_id": "$partai",
        "total_candidates": {
          "$sum": 1
        }
      }
    }
  ],
  agamaCandidateChart: [
    {
      "$group": {
        "_id": "$agama",
        "total_candidates": {
          "$sum": 1
        }
      }
    }
  ]  
}
