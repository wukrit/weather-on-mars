// Fetch NASA Weather API
// api key: COCIGDGp6Pfcbdgc5tTfWnmnFdcj05QtLcxJOOgm
// api url: https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
// live url: https://api.nasa.gov/insight_weather/?api_key=COCIGDGp6Pfcbdgc5tTfWnmnFdcj05QtLcxJOOgm&feedtype=json&ver=1.0

const mainDiv = document.querySelector('.content-wrapper')

const pullAvgTemp = dayObj => `${dayObj.AT.av}°`
const pullMinTemp = dayObj => `${dayObj.AT.mn}°`
const pullMaxTemp = dayObj => `${dayObj.AT.mx}°`
const pullWindSpeed = dayObj => dayObj.HWS.av
const pullWindDir = dayObj => dayObj.WD.most_common.compass_point

const createLi = (dayObj, func, label, unit1, unit2, seperator)  => {
  let funcValue = func(dayObj)
  let valueSpan = document.createElement("span")
  let li = document.createElement("li")
  let unit1Span = document.createElement("span")
  let unit2Span = document.createElement("span")
  let pipe = document.createElement("span")
  valueSpan.innerText = funcValue
  valueSpan.classList.add("value")
  pipe.innerText = seperator
  unit1Span.innerText = unit1
  unit2Span.innerText = unit2
  if (unit1 !== "") {
    unit1Span.classList.add(unit1, "selected")
    unit2Span.classList.add(unit2)
  }

  li.innerText = `${label}: `
  li.append(valueSpan, " ", unit1Span, pipe, unit2Span)
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

mainDiv.addEventListener("click", () => {
  let target = event.target
  if (target.classList.contains("C")) {
    let oldSel = target.parentElement.querySelector(".F")
    let valueSpan = target.parentElement.querySelector(".value")
    let value = parseFloat(valueSpan.innerText)

    value = ((value - 32) * (5/9)).toFixed(3)
    valueSpan.innerText = `${value}°`

    target.classList.add("selected")
    oldSel.classList.remove("selected")

  } else if (target.classList.contains("F")) {
    let oldSel = target.parentElement.querySelector(".C")
    let valueSpan = target.parentElement.querySelector(".value")
    let value = parseFloat(valueSpan.innerText)

    value = ((value * (9/5)) + 32).toFixed(3)
    valueSpan.innerText = `${value}°`

    target.classList.add("selected")
    oldSel.classList.remove("selected")
    // insert conversion here
  }
})
