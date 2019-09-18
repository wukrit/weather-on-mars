// Fetch NASA Weather API
// api key: COCIGDGp6Pfcbdgc5tTfWnmnFdcj05QtLcxJOOgm
// api url: https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
// live url: https://api.nasa.gov/insight_weather/?api_key=COCIGDGp6Pfcbdgc5tTfWnmnFdcj05QtLcxJOOgm&feedtype=json&ver=1.0

const pullAvgTemp = dayObj => `${dayObj.AT.av}°`
const pullMinTemp = dayObj => `${dayObj.AT.mn}°`
const pullMaxTemp = dayObj => `${dayObj.AT.mx}°`
const pullWindSpeed = dayObj => dayObj.HWS.av
const pullWindDir = dayObj => dayObj.WD.most_common.compass_point

const createLi = (dayObj, func, label, unit1, unit2, seperator)  => {
  let funcValue = func(dayObj)
  let li = document.createElement("li")
  let unit1Span = document.createElement("span")
  let unit2Span = document.createElement("span")
  let pipe = document.createElement("span")
  pipe.innerText = seperator
  unit1Span.innerText = unit1
  unit2Span.innerText = unit2
  if (unit1 !== "") {
    unit1Span.classList.add(unit1)
    unit2Span.classList.add(unit2)
  }

  li.innerText = `${label}: ${funcValue} `
  li.append(unit1Span, pipe, unit2Span)
  return li
}


fetch("https://api.nasa.gov/insight_weather/?api_key=COCIGDGp6Pfcbdgc5tTfWnmnFdcj05QtLcxJOOgm&feedtype=json&ver=1.0")
  .then(response => response.json())
  .then((json) => {
    const solKeys = json["sol_keys"]
    // console.log(solKeys)
    solKeys.forEach((solDay) => {
      if (json[solDay]) {
        let avgTempLi = createLi(json[solDay], pullAvgTemp, "Avg Temp:  ", "F", "C", " | ")
        let minTempLi = createLi(json[solDay], pullMinTemp, "Min Temp:  ", "F", "C", " | ")
        let maxTempLi = createLi(json[solDay], pullMaxTemp, "Max Temp:  ", "F", "C", " | ")
        let windSpeedLi = createLi(json[solDay], pullWindSpeed, "Wind Speed:  ", "m/s", "MpH", " | ")
        let windDirLi = createLi(json[solDay], pullWindDir, "Wind Direction:  ", "", "", "")
        let solDiv = document.createElement("div")
        let solUl = document.createElement("ul")
        let mainDiv = document.querySelector('.content-wrapper')
        let divTitle = document.createElement("h2")

        divTitle.innerText = `Sol ${solDay}`

        solDiv.id = `${solDay}-div`
        solDiv.classList.add("sol-div")

        solUl.id = `${solDay}-ul`
        solUl.classList.add("sol-ul")

        solUl.append(avgTempLi, minTempLi, maxTempLi, windSpeedLi, windDirLi)
        solDiv.append(divTitle)
        solDiv.append(solUl)
        mainDiv.append(solDiv)
      }
    })
  })
