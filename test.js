const { parse } = require("dotenv");
const { rgb } = require("pdf-lib");
const { height } = require("pdfkit/js/page");

function(instance, properties, context) {

    //=========================================================================id generator
  function makeid(length) {
   var result   = '';
   var characters    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
  }
  return result;
}
//=====================================================condition for charts to run only once   
if(instance.data.runOnce == false){
  function testfun(){
  console.log('SHIT WAS UPDATED by a function')
  }
  var parsedData = JSON.parse(properties.datajson)
  var chartType = parsedData.type;//reData.type//properties.charttype;
  var instanceCanvasId =  makeid(15);
  instance.canvas[0].id =instanceCanvasId;
  
  var instanceContainer = document.getElementById(instanceCanvasId);
  instance.data.instanceContainerMainID = instanceCanvasId;
  var mainCanvas = document.createElement("CANVAS");
  var mainCanvasID =  instance.data.testIdvar;
  mainCanvas.id= instance.data.testIdvar;
  mainCanvas.style.width = "100%";
  mainCanvas.style.height = "100%";
  instance.canvas[0].appendChild(mainCanvas);
  
  var chartData = {};
  var chartOptions = {};
  var chart = '';
  var chartPlugin = [];
  var money = 'x';
  var str = 'xxxx';
  
  var container = document.getElementById(mainCanvasID);

  //===================================================================================Money sign
  switch (properties.moneysign) {
      case 'dollars':
          money = '$';
          break;
      case 'euros':
          money = '€';
          break;
      case 'pounds':
          money = '£';
          break;
      default:

  }
  //===================================================================================Charts switch
  switch (chartType) {
  case "groupedBar":
    chart = "bar";
     container = document.getElementById(mainCanvasID);
    var step = 2;

    let pushedMaxData = [];
    let labelsDataHer2 = [];
    for(let j = 0; j<parsedData.data[0].costs.length;j++){
        labelsDataHer2.push(parsedData.data[0].costs[j].date)
      }
      
      var colorsNewArrBlue2 = [];
      for(let i = 0; i<parsedData.data.length;i++){
        colorsNewArrBlue2.push(parsedData.data[i].color)
      }
      let datasetsGroupedmain = [];
      let datasetsGrouped = {};
      let datasetsGroupedmini = [];
  for(let i = 0; i<parsedData.data.length;i++){
    datasetsGroupedmini = [];
    for(let j = 0; j<parsedData.data[i].costs.length;j++){

      pushedMaxData.push(parsedData.data[i].costs[j].cost)
      datasetsGroupedmini.push(parsedData.data[i].costs[j].cost)
    }
    datasetsGrouped ={
        label:"Dataset 1",
        data:datasetsGroupedmini,
        backgroundColor:colorsNewArrBlue2[i],
        borderColor:"#FFFFFF"
     }
     datasetsGroupedmain.push(datasetsGrouped); 
  }

//convert random dates to quarters
  let fullYears = [];
  let pushToOne = [];



  for(let i=0;i<labelsDataHer2.length;i++){   
    let data = labelsDataHer2[i].substring(0,4);
    if(!fullYears.includes(data)){
      fullYears.push(data)
    }   
  };
  for(let i=0;i<fullYears.length;i++){
    let dbzC = [];
    for(let j=0;j<labelsDataHer2.length;j++){
      if(labelsDataHer2[j].includes(fullYears[i])){
        let dbz = Date.parse(labelsDataHer2[i]); 
        dbzC.push(dbz)
      }
    }
    pushToOne.push(dbzC)
  }
let datasetsGroupedoMain2 =[];
var mainDateQuarters2 = [];
let datasetsGroupedforMinMAX = [];

  for(let a = 0;a<parsedData.data.length;a++){
    let q1sum =0;
    let q2sum =0;
    let q3sum =0;
    let q4sum =0;
    mainDateQuarters2 = [];
    let datasetsGroupedminiO1 = [];
    let datasetsGroupedo2={}
    for(let i = 0; i<fullYears.length;i++){
      q1sum =0;
      q2sum =0;
      q3sum =0;
      q4sum =0;
      for(let e = 0;e<parsedData.data[a].costs.length;e++){
      if(parsedData.data[a].costs[e].date.includes(fullYears[i])){
      let date2 = parsedData.data[a].costs[e].date;
      let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
      if(quarter==1){
        q1sum += parsedData.data[a].costs[e].cost;
      }else if(quarter == 2){
        q2sum += parsedData.data[a].costs[e].cost;
      }else if(quarter == 3){
        q3sum += parsedData.data[a].costs[e].cost;
      }else if(quarter == 4){
        q4sum += parsedData.data[a].costs[e].cost;
      } 
      }
    }
      let dt1 = fullYears[i] + " Q1";
      let dt2 = fullYears[i] + " Q2";
      let dt3 = fullYears[i] + " Q3";
      let dt4 = fullYears[i] + " Q4";
  
      mainDateQuarters2.push(dt1)
      mainDateQuarters2.push(dt2)
      mainDateQuarters2.push(dt3)
      mainDateQuarters2.push(dt4)
    datasetsGroupedminiO1.push(q1sum);
    datasetsGroupedminiO1.push(q2sum);
    datasetsGroupedminiO1.push(q3sum);
    datasetsGroupedminiO1.push(q4sum);
    
    datasetsGroupedforMinMAX.push(q1sum);
    datasetsGroupedforMinMAX.push(q2sum);
    datasetsGroupedforMinMAX.push(q3sum);
    datasetsGroupedforMinMAX.push(q4sum);
  }
  datasetsGroupedo2 ={
    label: parsedData.data[a].name,
    data: datasetsGroupedminiO1,
    backgroundColor:colorsNewArrBlue2[a],
    borderColor:"#FFFFFF"
 }
  datasetsGroupedoMain2.push(datasetsGroupedo2);

  }


chartData = {
    labels: mainDateQuarters2,
    datasets: datasetsGroupedoMain2
};


var rounderValueG = 10;


  //externalTooltipHandler2e
  const getOrCreateTooltip2e = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
  
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';
  
      const table = document.createElement('table');
      table.style.margin = '0px';
  
      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
  };
  
  const externalTooltipHandler2e = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip2e(chart);
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
  
    // Set Text
    if (tooltip.body) {
      const bodyLines = tooltip.body.map(b => b.lines);
    
      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body, i) => {    
        //rows
        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = 0;
        tr.style.whiteSpace = "nowrap"
        const tr0 = document.createElement('tr');
        tr0.style.backgroundColor = 'inherit';
        tr0.style.borderWidth = 0;
        tr0.style.whiteSpace = "nowrap"
        //collumns
        const td = document.createElement('td');
        td.style.borderWidth = 0;
        td.style.width  = '30px'; 
        td.style.fontSize = '12px';
        td.style.whiteSpace = "nowrap"
        td.style.padding ='3px';
        td.style.color = '#5B5B5B';

        const td0 = document.createElement('td');
        td0.style.borderWidth = 0;
        td0.style.width  = '30px'; 
        td0.style.fontSize = '12px';
        td0.style.whiteSpace = "nowrap"
        td0.style.padding ='3px';
        td0.style.color = '#5B5B5B';
        //fonts
        td.style.fontFamily = 'Poppins';
        td.style.fontWeight = '500';
        td0.style.fontFamily = 'Poppins';
        td0.style.fontWeight = '600';

        var resE = (chart.tooltip.dataPoints[0].dataset.data[chart.tooltip.dataPoints[0].dataIndex]).toFixed(2).replace(/[.,]00$/, "")+" "+money+parsedData.money;


            let iconDiv = document.createElement('div');
            iconDiv.style.height = '10px';
            iconDiv.style.width = '10px';
            iconDiv.style.display = 'inline-block';
            iconDiv.style.borderRadius = '2px';
            iconDiv.style.backgroundColor = chart.tooltip.labelColors[0].backgroundColor;
     //builder
        let text = document.createTextNode(" "+resE);
     
        let text0 = document.createTextNode(chartData.datasets[chart.tooltip.dataPoints[0].datasetIndex].label);
        td.appendChild(iconDiv)
        td.appendChild(text);
        tr.appendChild(td);
        td0.appendChild(text0);
        tr0.appendChild(td0);
        tableBody.appendChild(tr0);
        tableBody.appendChild(tr);
       
      });
  
      const tableRoot = tooltipEl.querySelector('table');
      tableRoot.style.backgroundColor = '#fff';
      tableRoot.style.opacity = 1;
      tableRoot.style.borderRadius = "10px";
      tableRoot.style.border = 'solid';
      tableRoot.style.borderWidth = '0px';
      tableRoot.style.borderColor = '#000';
      
  
      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }
  
      // Add new children
     
        tableRoot.appendChild(tableBody);
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

   
    
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.backgroundColor = '#fff';

    tooltipEl.style.borderRadius = "5px";
    tooltipEl.style.border = 'solid';
    tooltipEl.style.borderWidth = '0px';
    tooltipEl.style.borderColor = '#000';
    tooltipEl.style.boxShadow = '1px 1px 5px rgba(0, 0, 0, 0.85)';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = '8px';    
    if((tooltipEl.clientHeight+tooltip.caretY)<chart.height){
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
      tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    }else{
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY-tooltipEl.clientHeight + 'px';
    }


    
  };
  //end

  let minDataYgroupedbar = Math.round(Math.min(...datasetsGroupedforMinMAX));
  let maxDataYgroupedbar = Math.round(Math.max(...datasetsGroupedforMinMAX));
  let maxValueGroupedBar = Math.round(maxDataYgroupedbar/rounderValueG)*rounderValueG;
  let minValueGroupedBar = Math.round(minDataYgroupedbar/rounderValueG)*rounderValueG;

    var barData = chartData.datasets;
    chartOptions = {
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 45, 
          left: 50, 
          bottom:10, 
          right:50
        }
    },
      barThickness: 24,
      indexAxis: "x",
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
            display: true,
            color: '#2A2A2A',
            text: parsedData.title,
            padding: {
              top: -30,
              bottom: 0,
            },
            font: {
              family: 'Jost',
              size: 18,
              weight: "bold",
              lineHeight: 1.2,
            },
            align: "start",
          },
          subtitle: {
            display: true,
            color: '#2A2A2A',
            text: parsedData.subtitle,
            padding: {
              top: 5,
              bottom: 10,
            },
            font: {
              family: 'Poppins',
              size: 12,
              lineHeight: 1.2,
            },
            align: "start",
          },
        tooltip: {
            enabled: false,
            position: 'nearest',
            external: externalTooltipHandler2e
          }
      },
      scales: {
        x: {
          min: 0,
          max: 5,
          grid: {
            display: false,
            drawBorder: false,
            offset: true,
          },
          ticks:{
            font:{
              size: 12
            }
          }
        },
        y: {
          min: minValueGroupedBar,
          max: maxValueGroupedBar,
          grid: {
            display: true,
            drawBorder: true,
            borderDash: [2, 2],
          },
          ticks:{
            font:{
              size: 12
            },
            callback: function(value){
              return value + " " + money +parsedData.money;
            }
          }
        },
      },
    };
    if(instanceContainer.clientWidth <= 478){
      chartOptions.layout.padding ={
        top: 35, 
        left: 5, 
        bottom:5, 
        right:5
      };
      chartOptions.barThickness = 16;
      chartOptions.scales.x.min = 0;
      chartOptions.scales.x.max = 3;
      chartOptions.scales.x.ticks.font.size = 10;
      chartOptions.scales.y.ticks.font.size = 10;
    }

    break;
  case "horizontalBar":
    var barData = [];
    parsedData.data.forEach((e)=>barData.push(e.rNPV))

    let labelsHorizontal = [];
    var barSum = barData.reduce((pV, cV) => pV + cV, 0);
    let horizontalBarHolder = [];

   for(let i=0;i<parsedData.data.length;i++){
    barData.push(parsedData.data[i].rNPV);
    labelsHorizontal.push(parsedData.data[i].label);
    let creation = {
      label:  parsedData.data[i].label +" "+
        ((parsedData.data[i].rNPV * 100) / barSum).toFixed(2).replace(/[.,]00$/, "") +
        "%",
      data: [parsedData.data[i].rNPV],
      backgroundColor: parsedData.data[i].color,
    };
    horizontalBarHolder.push(creation);
   }

    chart = "bar";

    chartData = {
      labels: ["Test"],
      datasets:horizontalBarHolder
    };

    chartOptions = {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left:15,
          right: 0,
          top:1,
          bottom:10
        },
      },
      barThickness: 20,
      indexAxis: "y",
      hover: {
        animationDuration: 0,
      },
      scales: {
        x: {
          position :'center',
          display: false,
          stacked: true,
          grid: {
            display: false,
            drawBorder: false,
            offset: true,
          },
        },
        y: {
          display: false,
          stacked: true,
          grid: {
            display: false,
            drawBorder: false,
            offset: true,
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          onClick: function (e) {
           
        },
          position: "bottom",
          display: true,
          labels: {
            padding: 20,
            boxWidth: 16,
            boxHeight: 16,
            //color: 'rgb(0,255,0)'
          },
        },
        title: {
          display: true,
          color: '#2A2A2A',
          text: parsedData.title,
          padding: {
            top: 20,
            bottom: 0,
          },
          font: {
            family: 'Jost',
            size: 18,
            weight: "bold",
            lineHeight: 1.2,
          },
          align: "start",
        },
        subtitle: {
          display: true,
          color: '#2A2A2A',
          text: parsedData.subtitle,
          padding: {
            top: 10,
            bottom: 10,
          },
          font: {
            family: 'Poppins',
            size: 12,
            lineHeight: 1.2,
          },
          align: "start",
        },
      },
    };

    break;
  case "line":
    chart = "line";
   
      let parsedDatasetNPV = [];
      let parsedDatasetLabelsLine = [];
  
      for(let i = 0; i< parsedData.data.length;i++){
        parsedDatasetNPV.push(parsedData.data[i].revenue)
        parsedDatasetLabelsLine.push(parsedData.data[i].date)
      }
      instance.data.parsedMoneyValue = parsedData.money;
   
      var maxVal = Math.max(...parsedDatasetNPV);
    var maxValLength = maxVal.toString().length
    var valIdentificator = '';

    chartData = {
      labels: parsedDatasetLabelsLine,
      datasets: [
        {
          data: parsedDatasetNPV,
          fill: true,
          borderColor: "#F59F26",
          backgroundColor: "rgba(254, 224, 185, 0.7)",
          stepped: false,
          tension: 0.3,
          radius: 4,
          borderWidth: 3.5,
        },
      ],
    };

    chartOptions = {
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 26, 
          left: 16, 
          bottom:16, 
          right:36
        }
    },
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
            offset: true,
          },
        },
        y: {
          grid: {
            display: true,
            drawBorder: true,
            borderDash: [2, 2],
          },
          ticks: {
            stepSize: line2step,
            callback: function (value, index, values) {
              return value + " " +money + instance.data.parsedMoneyValue;
          
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#FEE0B9",
          bodyColor: "#000000",
          borderColor: "rgba(152, 152, 152, 0.49)",
          borderWidth: 1,

          borderRadius: 5,
          titleAlign: "center",
          bodySpacing: 5,
          bodyFont: {
            weight: "bold",
            size: 16,
          },
          padding: {
            left: 20,
            right: 20,
            top: 6,
            bottom: 6, //
          },
          displayColors: false,
          callbacks: {
            title: function () {},
            label: function (context) {
              return context.parsed.y + money+parsedData.money;
            },
          },
          yAlign: "bottom",
          xAlign: "center",
        },
      },
    };

    break;
  case "line2":
    chart = "line";
    var maxVal;
    var parsedDataset1NPV = [];
    var parsedDataset1rNPV = [];
    var parsedDatasetLabels = [];
    var parsedDataset1NPVMain = [];
    var parsedDataset1rNPVMain = [];
    for(let i = 0; i< parsedData.data.length;i++){
       parsedDataset1NPV = [];
       parsedDataset1rNPV = [];
       parsedDatasetLabels = [];
      for(let j = 0; j<parsedData.data[i].length;j++){
        parsedDataset1NPV.push(parsedData.data[i][j].NPV)
        parsedDataset1rNPV.push(parsedData.data[i][j].rNPV)
        parsedDatasetLabels.push(parsedData.data[i][j].date)
      }
      parsedDataset1NPVMain.push(parsedDataset1NPV)
      instance.data.parsedDataset1rNPVMain.push(parsedDataset1rNPV)
    }
    parsedDataset1rNPVMain = instance.data.parsedDataset1rNPVMain;
    instance.data.parsedDatasetLabels = parsedDatasetLabels;


    var mainDateQuarters2e = [];
    let fullYears2 = [];
    for(let i=0;i<parsedDatasetLabels.length;i++){   
      let data = parsedDatasetLabels[i].substring(0,4);
      if(!fullYears2.includes(data)){
        fullYears2.push(data)
      }   
    }; 
    let datasetsGroupedo2NPV = [];
    var datasetsGroupedoMain2e =[];
    let borderColorArr = ["#F59F26","rgba(13, 105, 134, 1)"];
    for(let a = 0;a<parsedDataset1rNPVMain.length;a++){

    mainDateQuarters2e = [];
    let datasetsGroupedminiO1 = [];
    let datasetsGroupedminiO1NPV = [];
    let datasetsGroupedo2 = {};
    for(let i = 0; i<fullYears2.length;i++){
      let q1sum =0;
    let q2sum =0;
    let q3sum =0;
    let q4sum =0;
    let q1sumNPV =0;
    let q2sumNPV =0;
    let q3sumNPV =0;
    let q4sumNPV =0;
       datasetsGroupedo2={}
      for(let e = 0;e<parsedData.data[a].length;e++){
      if(parsedData.data[a][e].date.includes(fullYears2[i])){
      let date2 = parsedData.data[a][e].date
      let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
      if(quarter==1){
        q1sumNPV += parsedData.data[a][e].NPV
        q1sum += parsedData.data[a][e].rNPV
      }else if(quarter == 2){
        q2sumNPV += parsedData.data[a][e].NPV
        q2sum += parsedData.data[a][e].rNPV
      }else if(quarter == 3){
        q3sumNPV += parsedData.data[a][e].NPV
        q3sum += parsedData.data[a][e].rNPV
      }else if(quarter == 4){
        q4sumNPV += parsedData.data[a][e].NPV
        q4sum += parsedData.data[a][e].rNPV
      }
      }
    }
      let dt1 = fullYears2[i] + " Q1";
      let dt2 = fullYears2[i] + " Q2";
      let dt3 = fullYears2[i] + " Q3";
      let dt4 = fullYears2[i] + " Q4";

      if(q1sumNPV !== 0){
        mainDateQuarters2e.push(dt1)
    datasetsGroupedminiO1NPV.push(q1sumNPV);
    datasetsGroupedminiO1.push(q1sum);

      }
      if(q2sumNPV !== 0){
        mainDateQuarters2e.push(dt2)
    datasetsGroupedminiO1NPV.push(q2sumNPV);
    datasetsGroupedminiO1.push(q2sum);

      }
      if(q3sumNPV !== 0){
        mainDateQuarters2e.push(dt3)
        datasetsGroupedminiO1NPV.push(q3sumNPV);
    datasetsGroupedminiO1.push(q3sum);
      
      }
      if(q4sumNPV !== 0){
        mainDateQuarters2e.push(dt4)
    datasetsGroupedminiO1NPV.push(q4sumNPV);
    datasetsGroupedminiO1.push(q4sum);
      }
      
    // datasetsGroupedminiO1.push(q1sum);
    // datasetsGroupedminiO1.push(q2sum);
    // datasetsGroupedminiO1.push(q3sum);
    // datasetsGroupedminiO1.push(q4sum);
    // datasetsGroupedminiO1NPV.push(q1sumNPV);
    // datasetsGroupedminiO1NPV.push(q2sumNPV);
    // datasetsGroupedminiO1NPV.push(q3sumNPV);
    // datasetsGroupedminiO1NPV.push(q4sumNPV);
  }

  datasetsGroupedo2 ={
    data: datasetsGroupedminiO1,
    fill: false,
    borderColor: borderColorArr[a],
    backgroundColor: "rgba(255, 255, 255, 1)",
    stepped: false,
    tension: 0.2,
    radius: 4,
    borderWidth: 3.5,
  }
  datasetsGroupedoMain2e.push(datasetsGroupedo2);
  datasetsGroupedo2NPV.push(datasetsGroupedminiO1NPV);
    };
    maxVal = Math.max(...parsedDataset1rNPV);

    chartData = {
      labels: mainDateQuarters2e,
      datasets: datasetsGroupedoMain2e
    };
    instance.data.mainDateQuarters2e = mainDateQuarters2e;
    var line2DataSetOrg = [];
    for(let i=0;i<datasetsGroupedoMain2e.length;i++){
      let orgDatasetLine = datasetsGroupedoMain2e[i].data.map((x) => x);
      instance.data.line2DataSetOrg.push(orgDatasetLine);
    }
    line2DataSetOrg = instance.data.line2DataSetOrg;
    var maxValLength = maxVal.toString().length;

    var yearorquarterhandler = 1;
    instance.data.yearorquarterhandler = yearorquarterhandler;

    let testInstance = 0;
    //externalTooltipHandler
    const getOrCreateTooltip = (chart) => {
      let tooltipEl = chart.canvas.parentNode.querySelector('div');
    
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        chart.canvas.parentNode.appendChild(tooltipEl);

        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';
    
        const table = document.createElement('table');
        table.style.margin = '0px';
    
        tooltipEl.appendChild(table);
      }
    
      return tooltipEl;
    };

    var npvMain =[];
    var rnpvMain =[];
    var newDataSet1ForTooltip =[];
    var newDataSet2ForTooltip = [];
    var newDataSet1ForTooltipr =[];
    var newDataSet2ForTooltipr = [];
    const externalTooltipHandler = (context) => {
      // Tooltip Element
      var extTimer = 1;
      const {chart, tooltip} = context;
      const tooltipEl = getOrCreateTooltip(chart);
      
      


      // Set Text
      if (tooltip.body) {
        testInstance = 0;
        const bodyLines = tooltip.body.map(b => b.lines);
      
        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body, i) => {    
          //rows
          const tr0 = document.createElement('tr');
          tr0.style.backgroundColor = 'inherit';
          tr0.style.borderWidth = 0;
          tr0.style.whiteSpace = "nowrap"
          
          const tr = document.createElement('tr');
          tr.style.backgroundColor = 'inherit';
          tr.style.borderWidth = 0;
          tr.style.whiteSpace = "nowrap"
          
          const tr2 = document.createElement('tr');
          tr2.style.backgroundColor = 'inherit';
          tr2.style.borderWidth = 0;
          tr2.style.whiteSpace = "nowrap"
          
          const tr3 = document.createElement('tr');
          tr3.style.backgroundColor = 'inherit';
          tr3.style.borderWidth = 0;
          tr3.style.whiteSpace = "nowrap"
          //collumns
          const td0 = document.createElement('td');
          td0.style.borderWidth = 0;
          td0.style.color = '#000';
          td0.style.whiteSpace = "nowrap"
          td0.style.fontSize = '12px';
          td0.style.paddingBottom ='3px'
          const td = document.createElement('td');
          td.style.borderWidth = 0;
          td.style.color = '#5b5b5b';
          if(chartData.datasets.length <2){
        td.style.width  = '50px'; 
    }else{
        td.style.width  = '120px'; 
    }
          td.style.fontSize = '12px';
          td.style.whiteSpace = "nowrap"
          td.style.padding ='3px';
         


          const td2 = document.createElement('td');
          td2.style.borderWidth = 0;
          td2.style.whiteSpace = "nowrap"
          td2.style.fontSize = '12px';
          td2.style.color = '#000';
          td2.style.padding ='3px';
          const td3 = document.createElement('td');
          td3.style.borderWidth = 0;
          td3.style.fontSize = '12px';
          td3.style.color = '#000';
          td3.style.whiteSpace = "nowrap"
          td3.style.paddingTop ='3px';

          const tdbtn = document.createElement('button');
          tdbtn.onclick = function () {
            console.log('IT WAS CLICKED')
          }
        tdbtn.style.position = 'relative';
        tdbtn.style.marginTop='4px';
        tdbtn.style.borderWidth = '1px';
        tdbtn.style.border = 'solid';
        tdbtn.style.borderColor = '#F59F26';
        tdbtn.style.borderRadius = '5px';

      
        tdbtn.style.width  = '100%'; 
        tdbtn.style.height  = '40px'; 
        tdbtn.style.fontSize = '12px';
        tdbtn.style.whiteSpace = "nowrap"
        tdbtn.style.padding ='3px';

        var tdbtnvert = document.createElement('div');
        tdbtnvert.style.margin = '0';
        tdbtnvert.style.position = 'absolute';
        tdbtnvert.style.top ='50%';
        tdbtnvert.style.transform = 'translateY(-50%)';
		    tdbtn.style.display='block';
        tdbtn.style.fontFamily = 'Jost';
        tdbtn.style.fontWeight = '600';
        tdbtn.style.fontSize = '16px';
        tdbtn.style.verticalAlign = "bottom";
        tdbtn.style.backgroundColor = '#fff';
        tdbtnvert.style.left = '50%';
        tdbtnvert.style.top = '50%';
        tdbtnvert.style.transform = 'translate(-50%, -50%)';
        tdbtnvert.style.backgroundColor = '#fff';
        testInstance++;
    
          
          //fonts
          td0.style.fontFamily = 'Poppins';
          td.style.fontFamily = 'Poppins';
          td2.style.fontFamily = 'Poppins';
          td3.style.fontFamily = 'Poppins';
          td0.style.fontWeight = "600";
          td2.style.fontWeight = "600";
          td.style.fontWeight = '500';
          td3.style.fontWeight = '500';

          var resE = 0;
           npvMain =[];
           rnpvMain =[];
           if(testInstance == 2){
            chart.tooltip.dataPoints[0].datasetIndex = 1;
           }

       if(yearorquarterhandler != 2){
        if(chart.tooltip.dataPoints[0].datasetIndex == 0){
          rnpvMain = datasetsGroupedoMain2e[0].data;
          npvMain = datasetsGroupedoMain2e[0].data
        }else{
          npvMain = datasetsGroupedoMain2e[0].data
          rnpvMain = datasetsGroupedoMain2e[1].data;
        }
       }else{
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaaAAAAAAAAAAAAA')
        console.log(newDataSet1ForTooltip)
        console.log(newDataSet1ForTooltipr)
        console.log(newDataSet2ForTooltip)
        console.log(newDataSet2ForTooltipr)

        if(chart.tooltip.dataPoints[0].datasetIndex == 0){
          npvMain = newDataSet1ForTooltip;
          rnpvMain = newDataSet1ForTooltipr;
        }else{
          npvMain = newDataSet2ForTooltip;
          rnpvMain = newDataSet2ForTooltipr;
        }
       }
    
          resE = (rnpvMain[chart.tooltip.dataPoints[0].dataIndex]).toFixed(2).replace(/[.,]00$/, "")+parsedData.money;

        let res = "";
        let resTemp = 0;            
              if(chart.tooltip.dataPoints[0].dataIndex >= 1){
                  resTemp = rnpvMain[chart.tooltip.dataPoints[0].dataIndex] - rnpvMain[chart.tooltip.dataPoints[0].dataIndex-1];
                  res = (rnpvMain[chart.tooltip.dataPoints[0].dataIndex] - rnpvMain[chart.tooltip.dataPoints[0].dataIndex-1]).toFixed(2).replace(/[.,]00$/, "")
              }else{
                resTemp = (rnpvMain[chart.tooltip.dataPoints[0].dataIndex]).toFixed(2).replace(/[.,]00$/, "")
                res = resTemp;
              };


              resTemp = res

              let resF ="";
              if(chart.tooltip.dataPoints[0].dataIndex == 0){
                resF = '0';
              }else{
                if(resTemp >0){
                  td3.style.color = '#71B560';
                  resF = "↗ "+res;
                }else{
                  td3.style.color = '#e04f4f';
                  resF = "↙ " + res; 
                }
              }
            

              let iconDiv = document.createElement('div');
              iconDiv.style.height = '10px';
              iconDiv.style.width = '10px';
              iconDiv.style.display = 'inline-block';
              iconDiv.style.borderRadius = '2px';
              iconDiv.style.backgroundColor = chart.tooltip.labelColors[0].borderColor;
              if(testInstance == 2){
                iconDiv.style.backgroundColor = chart.tooltip.labelColors[1].borderColor;
                tdbtn.style.display = 'none';
            
                chart.tooltip.dataPoints[0].datasetIndex=0;
                testInstance = 0;
              }




       //builder
       const text0 = document.createTextNode('rNPV');
          const text = document.createTextNode(" "+resE);
          const text2 = document.createTextNode('rNPV △');
          const text3 = document.createTextNode(resF+parsedData.money);
          td0.appendChild(text0);
          td.appendChild(iconDiv)
          td.appendChild(text);

          td2.appendChild(text2);
          td3.appendChild(text3);

          tr0.appendChild(td0);
          tr.appendChild(td);
          tr2.appendChild(td2);
          tr3.appendChild(td3);
          let text22 = document.createTextNode("View Inputs  →");  //"View Inputs  →"
          tdbtn.appendChild(tdbtnvert);
          tdbtnvert.appendChild(text22);
         if(chartData.datasets.length >1){
            if(chartData.datasets[0].data[chart.tooltip.dataPoints[0].dataIndex] == chartData.datasets[1].data[chart.tooltip.dataPoints[0].dataIndex]){
              tdbtn.style.display ='none';
            }
         }
         
          tableBody.appendChild(tr0);
          tableBody.appendChild(tr);
          tableBody.appendChild(tr2);
          tableBody.appendChild(tr3);
          if(parsedData.data.length == 2){
            tableBody.appendChild(tdbtn);
        }
        });
    
        const tableRoot = tooltipEl.querySelector('table');
        tableRoot.style.backgroundColor = '#fff';
        tableRoot.style.opacity = 1;
        tableRoot.style.borderRadius = "2px";
        tableRoot.style.border = 'solid';
        tableRoot.style.borderWidth = '0px';
        tableRoot.style.borderColor = '#000';
        
    
        // Remove old children
        while (tableRoot.firstChild) {
          tableRoot.firstChild.remove();
        }
    
        // Add new children
   
          tableRoot.appendChild(tableBody);




      }
    
      const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

     
      
      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.display  = 'block';
      tooltipEl.style.backgroundColor = '#fff';
      tooltipEl.style.borderRadius = "2px";
      tooltipEl.style.border = 'solid';
      tooltipEl.style.borderWidth = '0px';
      tooltipEl.style.borderColor = '#000';
      tooltipEl.style.boxShadow = '1px 1px 5px black';
      tooltipEl.style.font = tooltip.options.bodyFont.string;
      tooltipEl.style.padding = '8px';    
      var extJAYCY = 0;
      var extJAYCYent = 0;
      tooltipEl.addEventListener('mouseover', (e) => {
        testInstance = 0;

        extJAYCYent = 1;
        if(extJAYCY != 2){
          tooltipEl.style.display  = 'block';
          tooltipEl.style.opacity = 1;
        }
      });    
      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        setTimeout(function(){
          if (extJAYCYent == 0) {
          tooltipEl.style.display = 'none';
      }
        }, 200);   
        return;
      }
          
 
      
      tooltipEl.addEventListener('mouseleave', (e) => {
        testInstance = 0;

          tooltipEl.style.display  = 'none';
          tooltipEl.style.opacity = 0;
         extJAYCY = 2;
       });
       

      if((tooltipEl.clientHeight+tooltip.caretY+6)<chart.height){
        if(parsedData.data.length == 1){
          tooltipEl.style.left = positionX + tooltip.caretX+45+  'px';
          tooltipEl.style.top = positionY + tooltip.caretY+4+'px';
        }else{
          tooltipEl.style.left = positionX + tooltip.caretX +70+  'px';
          tooltipEl.style.top = positionY + tooltip.caretY +6+'px';
        }
      }else{
        tooltipEl.style.left = positionX + tooltip.caretX +40+'px';
      tooltipEl.style.top = positionY + tooltip.caretY-tooltipEl.clientHeight-2 +'px';
      }
      if(tooltipEl.clientWidth>tooltip.caretX){
        tooltipEl.style.left =tooltip.caretX+(tooltipEl.clientWidth/2)+'px';
      }
      if(chart.width<(tooltip.caretX+tooltipEl.clientWidth)){
        tooltipEl.clientWidth = '136px';
        tooltipEl.style.left =tooltip.caretX-(tooltipEl.clientWidth/1.8)+'px';
      }
      
    };
    //end first HANDLER
    let txtForLabel1 = "Asset Value "+money+parsedData.money;


    switch (maxValLength) {
      case 4:
          line2step = 2000;
          break;
      case 5:
          line2step = 2000;
          break;
      case 6:
          line2step = 20000;
          break;
          case 7:
          line2step = 200000;
          break;
      case 8:
          line2step = 2000000;
          break;
      case 9:
          line2step = 20000000;
      break;
      default:
    }
    let switchLegendLine2 = false;
    if(parsedData.data.length == 2){
      switchLegendLine2 = true;
    }
    chartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      layout: {
        padding: {
          top: 10, 
          left: 16, 
          bottom:16, 
          right:40
        }
    },
      scales: {
        x: {
          grid: {
            display: true,
            drawBorder: true,
            borderDash: [2, 2],
          },
        },
        y: {
          title:{
            display: true,
            text:txtForLabel1,
            color: '#2A2A2A',
            align: 'center',
            font: {
              size: 13,
              family: 'Poppins'
            },
           },
          grid: {
            display: true,
            drawBorder: true,
            borderDash: [2, 2],
          },
          ticks: {
            stepSize: line2step,
            callback: function (value, index, values) {         
              // if(valIdentificator =='K'){
              //     return (value/1000);
              // }else if(valIdentificator == 'M'){
              //     return (value/1000000);
              // }else{
                  return value;
             // }
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          display: switchLegendLine2,
          labels: {
            usePointStyle:true,
            pointStyle:'rectRounded',
            padding: 20,
            boxWidth: 16,
            boxHeight: 16,
          },
        },
        tooltip: {
          enabled: false,
          position: 'nearest',
          external: externalTooltipHandler
        },
        title: {
          display: true,
          color: '#2A2A2A',
          text: parsedData.title,
          padding: {
            top: 10,
            bottom: 30,
          },
          font: {
            size: 18,
            weight: "bold",
            family: 'Jost',
            lineHeight: 1.2,
          },
          align: "start",
        }
      },
    };

    break;
  case "bar": 
    chart = "bar";

    var dataBarExtracted = [];
    var dataBarExtractedMinus = [];
    var dataBarExtractedPlus = [];
    var labelsBarExtracted = [];
    if(parsedData.data[0].licensing_type == 'In-licensing'){
      for(let i = 0;i<parsedData.data[0].milestones.length;i++){
        dataBarExtracted.push(parsedData.data[1].milestones[i].in_licensing_costs)
        dataBarExtractedMinus.push(parsedData.data[0].milestones[i].in_licensing_costs)
        dataBarExtractedPlus.push(parsedData.data[2].milestones[i].in_licensing_costs)
        labelsBarExtracted.push(parsedData.data[1].milestones[i].date)
      }
    }else if(parsedData.data[0].licensing_type == 'Out-Licensing'){
      for(let i = 0;i<parsedData.data.milestones.length;i++){
        dataBarExtracted.push(parsedData.data[1].milestones[i].out_licensing_costs)
        dataBarExtractedMinus.push(parsedData.data[0].milestones[i].out_licensing_costs)
        dataBarExtractedPlus.push(parsedData.data[2].milestones[i].out_licensing_costs)
        labelsBarExtracted.push(parsedData.data[1].milestones[i].date)
    }
    }else if(parsedData.data[0].licensing_type == 'In-licensing&Out-Licensing'){
      for(let i = 0;i<parsedData.data.milestones.length;i++){
        let data = parsedData.data[1].milestones[i].out_licensing_costs + parsedData.data[1].milestones[i].in_licensing_costs
        let dataMinus = parsedData.data[0].milestones[i].out_licensing_costs + parsedData.data[0].milestones[i].in_licensing_costs
        let dataPlus = parsedData.data[2].milestones[i].out_licensing_costs + parsedData.data[2].milestones[i].in_licensing_costs
        dataBarExtracted.push(data)
        dataBarExtractedMinus.push(dataMinus)
        dataBarExtractedPlus.push(dataPlus)
        labelsBarExtracted.push(parsedData.data[1].milestones[i].date)
    }
    }else{
    };

    var step = 5;
    container = document.getElementById(mainCanvasID);
    var entered_barData = dataBarExtracted;
    var barData = entered_barData;
    let lblBAR = labelsBarExtracted;
    var valIdentificator = '';
    var line2step = 10;
    var rounderValue = 10;
    let fullYearsBar = [];
    for(let i=0;i<labelsBarExtracted.length;i++){   
      let data = labelsBarExtracted[i].substring(0,4);
      if(!fullYearsBar.includes(data)){
        fullYearsBar.push(data)
      }   
    }; 
  //turning dates into quarters
  var mainDateQuarters2es = [];
  let datasetsGroupedminiO2 = [];
  var datasetsGroupedminiO2Minus = [];
  var datasetsGroupedminiO2Plus = [];
    for(let i = 0; i<fullYearsBar.length;i++){
    let q1sum =0;
    let q2sum =0;
    let q3sum =0;
    let q4sum =0;

    let q1sumMinus =0;
    let q2sumMinus =0;
    let q3sumMinus =0;
    let q4sumMinus =0;
    
    let q1sumPlus =0;
    let q2sumPlus =0;
    let q3sumPlus =0;
    let q4sumPlus =0;

      for(let e = 0;e<labelsBarExtracted.length;e++){
        if(labelsBarExtracted[e].includes(fullYearsBar[i])){
        let date2 = labelsBarExtracted[e]
        let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);

        if(quarter==1){
          q1sum += dataBarExtracted[e]
          q1sumMinus += dataBarExtractedMinus[e]
          q1sumPlus += dataBarExtractedPlus[e]
        }else if(quarter == 2){
          q2sum += dataBarExtracted[e]
          q2sumMinus += dataBarExtractedMinus[e]
          q2sumPlus += dataBarExtractedPlus[e]
        }else if(quarter == 3){
          q3sum += dataBarExtracted[e]
          q3sumMinus += dataBarExtractedMinus[e]
          q3sumPlus += dataBarExtractedPlus[e]
        }else if(quarter == 4){
          q4sum += dataBarExtracted[e]
          q4sumMinus += dataBarExtractedMinus[e]
          q4sumPlus += dataBarExtractedPlus[e]
        }  
        }
      }
      let dt1 = fullYearsBar[i] + " Q1";
      let dt2 = fullYearsBar[i] + " Q2";
      let dt3 = fullYearsBar[i] + " Q3";
      let dt4 = fullYearsBar[i] + " Q4";
    
    mainDateQuarters2es.push(dt1)
    mainDateQuarters2es.push(dt2)
    mainDateQuarters2es.push(dt3)
    mainDateQuarters2es.push(dt4)

    datasetsGroupedminiO2.push(q1sum);
    datasetsGroupedminiO2.push(q2sum);
    datasetsGroupedminiO2.push(q3sum);
    datasetsGroupedminiO2.push(q4sum);

    datasetsGroupedminiO2Minus.push(q1sumMinus);
    datasetsGroupedminiO2Minus.push(q2sumMinus);
    datasetsGroupedminiO2Minus.push(q3sumMinus);
    datasetsGroupedminiO2Minus.push(q4sumMinus);

    datasetsGroupedminiO2Plus.push(q1sumPlus);
    datasetsGroupedminiO2Plus.push(q2sumPlus);
    datasetsGroupedminiO2Plus.push(q3sumPlus);
    datasetsGroupedminiO2Plus.push(q4sumPlus);

    }
    lblBAR = mainDateQuarters2es;
    instance.data.mainDateQuarters2eBar = mainDateQuarters2es;
    entered_barData = datasetsGroupedminiO2;
    let minDataYbar = Math.round(Math.min(...entered_barData));
    let maxDataYbar = Math.round(Math.max(...entered_barData));
    let maxValueBar = Math.round(maxDataYbar/rounderValue)*rounderValue;
    //end of dates -> quarters

  //externalTooltipHandler2
  const getOrCreateTooltip2 = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
  
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';
  
      const table = document.createElement('table');
      table.style.margin = '0px';
  
      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
  };
  
  const externalTooltipHandler2 = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip2(chart);
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
  
    // Set Text
    if (tooltip.body) {
      const bodyLines = tooltip.body.map(b => b.lines);
    
      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body, i) => {    
        //rows
        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = 0;
        tr.style.whiteSpace = "nowrap"
        //collumns
        const td = document.createElement('td');
        td.style.borderWidth = 0;
        td.style.width  = '30px'; 
        td.style.fontSize = '12px';
        td.style.whiteSpace = "nowrap"
        td.style.padding ='3px';
        td.style.color = '#5B5B5B';
        
        //fonts
        td.style.fontFamily = 'Poppins';
        td.style.fontWeight = '500';

       
       var resE = (chart.tooltip.dataPoints[0].dataset.data[chart.tooltip.dataPoints[0].dataIndex]).toFixed(2).replace(/[.,]00$/, "")+" "+money+parsedData.money;
      


      let iconDiv = document.createElement('div');
            iconDiv.style.height = '10px';
            iconDiv.style.width = '10px';
            iconDiv.style.display = 'inline-block';
            iconDiv.style.borderRadius = '50px';
            iconDiv.style.backgroundColor = chart.tooltip.labelColors[0].borderColor;

     //builder
        let text = document.createTextNode(" "+resE);
        td.appendChild(iconDiv)
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
       
      });
  
      const tableRoot = tooltipEl.querySelector('table');
      tableRoot.style.backgroundColor = '#fff';
      tableRoot.style.opacity = 1;
      tableRoot.style.borderRadius = "10px";
      tableRoot.style.border = 'solid';
      tableRoot.style.borderWidth = '0px';
      tableRoot.style.borderColor = '#000';
      
  
      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }
  
      // Add new children
     
        tableRoot.appendChild(tableBody);
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

   
    
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.backgroundColor = '#fff';

    tooltipEl.style.borderRadius = "5px";
    tooltipEl.style.border = 'solid';
    tooltipEl.style.borderWidth = '0px';
    tooltipEl.style.borderColor = '#000';
    tooltipEl.style.boxShadow = '1px 1px 5px rgba(0, 0, 0, 0.85)';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = '8px';    
    if((tooltipEl.clientHeight+tooltip.caretY)<chart.height){
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
      tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    }else{
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY-tooltipEl.clientHeight + 'px';
    }


    
  };
  //end

    chartData = {
      labels: lblBAR,
      datasets: [{
        label: "test",
        data: entered_barData,
        backgroundColor: [
          'rgba(13, 105, 134, 1)'
        ],
        borderColor: ['rgba(13, 105, 134, 1)'],
        borderWidth: 1
      }]
    };
    chartOptions = {
      maintainAspectRatio: false,
        layout: {
            padding: 10
        },
      barThickness: 20,
      scales: {
        x: {
          min: 0,
          max: 5,
          ticks: {
            padding: 10,
          },
          grid: {
            display: false,
            drawBorder: false,
            offset: true,
          },
        },
        y: {
        min: minDataYbar,
        max: maxValueBar,//maxDataYbar,
        ticks: {
          callback: function(value, index, values) {
            return value+" "+money+parsedData.money;
          },
        }
        },

      },
      layout: {
        padding: 50,
      },
      responsive: true,
      plugins: {
        afterDraw: function(chart, args, options) {
      },
        legend: {
          display: false,
        },
        title: {
          display: true,
          color: '#2A2A2A',
          text: parsedData.title,
          padding: {
            top: -30,
            bottom: 0,
          },
          font: {
            family: 'Jost',
            size: 18,
            weight: "bold",
            lineHeight: 1.2,
          },
          align: "start",
        },
        subtitle: {
          display: true,
          color: '#2A2A2A',
          text: parsedData.subtitle,
          padding: {
            top: 0,
            bottom: 20,
          },
          font: {
            family: 'Poppins',
            size: 12,
            lineHeight: 1.2,
          },
          align: "start",
        },
        tooltip: {
          enabled: false,
          position: 'nearest',
          external: externalTooltipHandler2
        },
      },
    };
    break;
  case "radar":
  
    var datasetRadars = [];  
    var legendDisplayRadar = {};
    chart = "radar";
    var minus5 = [];
    var plus5 = [];
    let labelArr = [];
    let waccArrData = [];
    let radarSum = 0;
    let radarSumMinus = 0;
    let radarSumPlus = 0;

    if(parsedData.onlyOne == false){

      for(let i = 0; i<parsedData.data[0].length;i++){
        labelArr.push(parsedData.data[0][i].label)
        waccArrData.push(parsedData.data[1][i].rNPV)
        minus5.push(parsedData.data[0][i].rNPV)
        plus5.push(parsedData.data[2][i].rNPV)
        radarSum += parsedData.data[1][i].rNPV
        radarSumMinus += parsedData.data[0][i].rNPV
        radarSumPlus += parsedData.data[2][i].rNPV
    };
    }else{
      for(let i = 0; i<parsedData.data.length;i++){
        labelArr.push(parsedData.data[i].label)
        waccArrData.push(parsedData.data[i].rNPV)
        radarSum += parsedData.data[i].rNPV;
      }
    }



    var waccArr = waccArrData;
   
    //labels
    let label1 =  parsedData.name+" -" +parsedData.percentage+"%";
    let label2 =  parsedData.name;
    let label3 =  parsedData.name+" +"+parsedData.percentage+"%";

    if(parsedData.onlyOne == false){
      datasetRadars = [
          {
            label:label1,
            data: minus5,
            fill: true,
            backgroundColor: "#FFE6C54D",
            borderColor: "#F59F26",
            pointBackgroundColor: "#F59F26",
            pointBorderColor: "#F59F26",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#F59F26",
            pointRadius: 4,
          },
          {
            label: label2,
            data: waccArr,
            fill: true,
            backgroundColor: "#FFA01133",
            borderColor: "#F59F26",
            pointBackgroundColor: "#F59F26",
            pointBorderColor: "#F59F26",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#F59F26",
            pointRadius: 4,
          },
          {
            label: label3,
            data: plus5,
            fill: true,
            backgroundColor: "#9C641033",
            borderColor: "#CE6E10",
            pointBackgroundColor: "#CE6E10",
            pointBorderColor: "#CE6E10",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#CE6E10",
            pointRadius: 4,
          },
        ];
        legendDisplayRadar = {
          position: "right",
          display: true,
          labels: {
            padding: 30,
            boxWidth: 16,
            boxHeight: 16,
          },
        };
    }else{
      datasetRadars = [
          {
            label: label2,
            data: waccArr,
            fill: true,
            backgroundColor: "#FFA01133",
            borderColor: "#F59F26",
            pointBackgroundColor: "#F59F26",
            pointBorderColor: "#F59F26",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#F59F26",
            pointRadius: 4,
          }];
          legendDisplayRadar = {
              display: false
            };
    }

    chartData = {
      labels: labelArr,
      datasets: datasetRadars,
    };

    chartOptions = {
      maintainAspectRatio: false,
     // aspectRatio: 1,
      layout: {
        padding: {
          top: 0, 
          left: 0, 
          bottom:0, 
          right:0
        }
      },
      legend: {
        labels: {
          boxWidth: 10
        }
      },
      responsive: true,
      elements: {
        line: {
          borderWidth: 2,
          borderJoinStyle: "round",
        },
      },
      scales: {
        r: {
          pointLabels: {
            font: {
              size: 10,
            },
          },
          grid: {
            circular: true,
          },
          beginAtZero: true,
          ticks: {
            callback: function (value, index, values) {
                  return value +" "+money+parsedData.money;
            },
          },
        }
      },
      plugins: {
        title: {
          display: true,
          color: '#2A2A2A',
          text: parsedData.title,
          padding: {
            top: 0,
            bottom: 0,
          },
          font: {
            family: 'Jost',
            size: 18,
            weight: "bold",
            lineHeight: 1.2,
          },
          align: "start",
        },
        subtitle: {
          display: true,
          color: '#2A2A2A',
          text: parsedData.subtitle,
          padding: {
            top: 0,
            bottom: 10,
          },
          font: {
            family: 'Poppins',
            size: 12,
            lineHeight: 1.2,
          },
          align: "start",
        },
        legend: legendDisplayRadar,
        tooltip: {
          backgroundColor: "#FFFFFF",
          bodyColor: "#000000",
          caretSize: 0,
          titleColor: "rgba(91, 91, 91, 1)",
          borderColor: "rgba(152, 152, 152, 0.49)",
          borderWidth: 1,
          borderRadius: 15,
          titleAlign: "center",
          bodySpacing: 5,
          bodyFont: {
            weight: "bold",
            size: 0,
          },
          footerMarginTop: 20,
          titleFont: {
              family: 'Jost',
              weight: "600",
              size: 12,
          },
          padding: {
            left: 20,
            right: 20,
            top: 5,
            bottom: -5,
          },
          displayColors: false,
          yAlign: "bottom",
          xAlign: "left",
          callbacks: {
            title: function (context) {
              let radarSum = 0;
              let radarSumMinus = 0;
              let radarSumPlus = 0;
              let finalVal = [];
              let radarSumFinal = 0;
              if(instance.data.movedDataMinus.length != 0){
                radarSumMinus = instance.data.movedDataMinus.reduce((a,b)=>a+b)
                radarSumPlus = instance.data.movedDataPlus.reduce((a,b)=>a+b)
                radarSum = instance.data.movedData.reduce((a,b)=>a+b)
              }else{
                if(parsedData.onlyOne == false){
                  for(let i = 0; i<parsedData.data[0].length;i++){
                    radarSum += parsedData.data[1][i].rNPV
                    radarSumMinus += parsedData.data[0][i].rNPV
                    radarSumPlus += parsedData.data[2][i].rNPV
                };
                }else{
                  for(let i = 0; i<parsedData.data.length;i++){
                    radarSum += parsedData.data[i].rNPV;
                  }
                };
              }
              console.log('context')
              console.log()
           
              if(context[0].datasetIndex == 0){
                radarSumFinal = radarSumMinus;
              }else if(context[0].datasetIndex == 1){
                radarSumFinal = radarSum;
              }else if(context[0].datasetIndex== 2){
                radarSumFinal = radarSumPlus;
              }
                return (
                  context[0].label +
                  " " +
                  context[0].raw+money+parsedData.money+ " " + Math.round((context[0].raw*100)/radarSumFinal) +"%"
                );
              //}
            },
          },
        },
      },
    };
    break;
  case "doughnut-pie":
    chart = "doughnut";
    let labelExtractor = [];
    let npvDataExtractor = [];
    for(let i = 0;i<parsedData.data.length;i++){
        labelExtractor.push(parsedData.data[i].label)
        npvDataExtractor.push(parsedData.data[i].rNPV);
    };
    var doughnutGroupVal = npvDataExtractor.reduce((a, b) => a + b, 0);
    var doughnutShortener = "";
 
     var centerValue=(doughnutGroupVal).toFixed(2).replace(/[.,]00$/, "")+" "+money+parsedData.money;


    var changedLabels = [];
    
    for(label in labelExtractor){
      let lbl = labelExtractor[label] + " " + Math.round((npvDataExtractor[label]*100)/doughnutGroupVal)+"%";
      changedLabels.push(lbl);
    };
    let colorarrforbackground = [];
    if(npvDataExtractor.length < 6){
      colorarrforbackground = ['#F6A536', '#FEE0B9', '#FCC379', '#FDD299', '#F9B558',  '#EF9722'];
    }else{
      colorarrforbackground = ['#F6A536', '#FEE0B9', '#FCC379', '#FDD299', '#F9B558',  '#EF9722', '#E5891B',  '#DA7B15', '#CE6E10'];
      
    }
    chartData = {
      labels: changedLabels,
      datasets: [
        {
          data: npvDataExtractor,
          backgroundColor: colorarrforbackground,
          hoverOffset: 4,
        },
      ],
    };

      chartOptions = {
        maintainAspectRatio: false,
        layout: {
           padding: 10
       },
         responsive: true,
         cutout: "60%",
         plugins: {
           title: {
             display: true,
             color: '#2A2A2A',
             text: parsedData.title,
             padding: {
               top: 5,
               bottom: -40,
             },
             font: {
               family: 'Jost',
               size: 18,
               weight: "bold",
               lineHeight: 1.2,
             },
             align: "start",
           },
           subtitle: {
             display: true,
             color: '#2A2A2A',
             text: parsedData.subtitle,
             padding: {
               top: 50,
               bottom: -30,
             },
             font: {
               family: 'Poppins',
               size: 12,
               lineHeight: 1.2,
             },
             align: "start",
           },
           legend: {
            onClick: function (e) {
            
          },
             position: "right",
             display: true,
             labels: {
             boxWidth: 15, 
             padding: 25,
             },
           },
           tooltip: {
             backgroundColor: "#FFFFFF",
             bodyColor: "rgba(91, 91, 91, 1)",
             caretSize: 0,
             borderColor: "rgba(152, 152, 152, 0.49)",
             borderWidth: 1,
             borderRadius: 5,
             titleAlign: "center",
             bodySpacing: 5,
             bodyFont: {
               family: 'Jost',
               weight: "600",
               size: 12,
             },
             padding: {
               left: 20,
               right: 20,
               top: 9,
               bottom: 9,
             },
             displayColors: false,
             yAlign: "bottom",
             xAlign: "center",
             callbacks: {
               label: function(context) {
                   let  label = context.label.replace(/\d+% ?/g, "")+" "+context.parsed+" "+money+parsedData.money+" "+Math.round((context.parsed*100)/doughnutGroupVal)+"%";
                   return label
               }
           },
           },
         },
       };
    //}

    
    chartPlugin = [
     
    ];

    if(instanceContainer.clientWidth <= 449){
      chartOptions.responsive = true;
      chartOptions.maintainAspectRatio = false;
      chartOptions.aspectRatio = 0.4
      chartOptions.plugins.legend.position = 'bottom';
      chartOptions.plugins.subtitle.padding.bottom = 10;
      chartOptions.plugins.legend.labels.padding = 18
    }

    break;
  case "doughnut-pie-diff":
      chart = "doughnut";

    let newlabelExtractor = [];
    let newnpvDataExtractor = [];
    let oldnpvDataExtractor = [];

    for(let i = 0;i<parsedData.data.length;i++){
        newlabelExtractor.push(parsedData.data[i].label)
        newnpvDataExtractor.push(parsedData.data[i].rNPV);
        oldnpvDataExtractor.push(parsedData.old_data[i].rNPV);
    };


      var doughnutGroupVal = newnpvDataExtractor.reduce((a, b) => a + b, 0);
      var doughnutGroupVal2 = oldnpvDataExtractor.reduce((a, b) => a + b, 0);
      var doughnutShortener = ""; 
      var centerValue = doughnutGroupVal.toFixed(2).replace(/[.,]00$/, "");
      let doughnutBackgroundColor = ['#F6A536', '#FEE0B9', '#FCC379', '#FDD299', '#F9B558',  '#EF9722']; // bad go through colors
      let doughnutBackgroundColorBLUE = ['#15A8D7', '#7BD6F2', '#0D6986'];
      if(newnpvDataExtractor.length < 6){
         doughnutBackgroundColor = ['#F6A536', '#FEE0B9', '#FCC379', '#FDD299', '#F9B558',  '#EF9722']; // bad go through colors
         doughnutBackgroundColorBLUE = ['#15A8D7', '#7BD6F2', '#0D6986', '#0B5870', '#BDE9F9', '#E7F0F3'];
      }else{
        doughnutBackgroundColor =     ['#F6A536', '#FEE0B9', '#FCC379', '#FDD299', '#F9B558',  '#EF9722', '#E5891B',  '#DA7B15', '#CE6E10'];
        doughnutBackgroundColorBLUE = ['#15A8D7', '#7BD6F2', '#0D6986', '#0B5870', '#BDE9F9', '#E7F0F3', '#094659', '#1D3942', '#021216'];
      }
      

      let colorsNstufforange =[];
      let colorsNstuffblue =[];
      let esta = 0;
  
      for(let i = 0;i<parsedData.data.length;i++){
          colorsNstufforange.push(doughnutBackgroundColor[esta])
          colorsNstuffblue.push(doughnutBackgroundColorBLUE[esta])
          esta++;
         
      };
      doughnutBackgroundColorBLUE = colorsNstuffblue;
      doughnutBackgroundColor =colorsNstufforange;


      let doughnutBackgroundColorNEW = [];
      let percentageIdf1 = [];
      let percentageIdf2 = [];
      let clickableData = [];
      for(let i = 0;i<newnpvDataExtractor.length;i++){
        let e = Math.round((newnpvDataExtractor[i]*100)/doughnutGroupVal);
        let e2 = Math.round((oldnpvDataExtractor[i]*100)/doughnutGroupVal2);
        percentageIdf1.push(e)
        percentageIdf2.push(e2)
        if(percentageIdf1[i] == percentageIdf2[i]){
            doughnutBackgroundColorNEW.push(doughnutBackgroundColor[i])
          }else{
            doughnutBackgroundColorNEW.push(doughnutBackgroundColorBLUE[i])
            clickableData.push(i)
          }
      }

        centerValue=doughnutGroupVal.toFixed(2).replace(/[.,]00$/, "")+" "+money +parsedData.money;

        //externalTooltipHandler3
  const getOrCreateTooltip3 = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
 
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '30px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';
  
      const table = document.createElement('table');
      table.style.margin = '0px';
  
      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
  };
  let ies = 1;
  
  const externalTooltipHandler3 = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip3(chart);
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
  
    // Set Text
    if (tooltip.body) {

      const bodyLines = tooltip.body.map(b => b.lines);
    
      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body, i) => {    
        //rows
        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = 0;
        tr.style.whiteSpace = "nowrap"
        const tr2 = document.createElement('tr');
        tr2.style.backgroundColor = 'inherit';
        tr2.style.borderWidth = 0;
        tr2.style.whiteSpace = "nowrap"
        //collumns
        const td = document.createElement('td');
        td.style.borderWidth = 0;
        td.style.color = '#5B5B5B';
        td.style.width  = '50px'; 
        td.style.fontSize = '12px';
        td.style.whiteSpace = "nowrap"
        td.style.padding ='3px';
        
        const tdbtn = document.createElement('div');
        tdbtn.style.position = 'relative';
        tdbtn.style.marginTop='4px';
        tdbtn.style.borderWidth = '1px';
        tdbtn.style.border = 'solid';
        tdbtn.style.borderColor = '#F59F26';
        tdbtn.style.borderRadius = '5px';
        tdbtn.style.backgroundColor = '#fff';

        tdbtn.style.color = '#fff';
        tdbtn.style.width  = '100%'; 
        tdbtn.style.height  = '40px'; 
        tdbtn.style.fontSize = '12px';
        tdbtn.style.whiteSpace = "nowrap"
        tdbtn.style.padding ='3px';

        var tdbtnvert = document.createElement('div');
        tdbtnvert.style.margin = '0';
        tdbtnvert.style.position = 'absolute';
        tdbtnvert.style.top ='50%';
        tdbtnvert.style.backgroundColor = '#fff';
        tdbtnvert.style.transform = 'translateY(-50%)';
        tdbtnvert.style.left = '50%';
        tdbtnvert.style.top = '50%';
        tdbtnvert.style.transform = 'translate(-50%, -50%)';
        //fonts
        td.style.fontFamily = 'Jost';
        td.style.fontWeight = '600';
        tdbtn.style.display='block';
        tdbtn.style.fontFamily = 'Jost';
        tdbtn.style.fontWeight = '600';
        tdbtn.style.fontSize = '16px';
        tdbtn.style.verticalAlign = "bottom";

         var resE = chart.boxes[0].legendItems[chart.tooltip.dataPoints[0].dataIndex].text.replace(/\d+% ?/g, "")+" "+chart.tooltip.dataPoints[0].dataset.data[chart.tooltip.dataPoints[0].dataIndex]+" "+money+parsedData.money+" "+Math.round((chart.tooltip.dataPoints[0].dataset.data[chart.tooltip.dataPoints[0].dataIndex]*100)/doughnutGroupVal)+"%";



     //builder
        let text = document.createTextNode(" "+resE);
        let text2 = document.createTextNode("View Inputs  →");
        td.appendChild(text);
        tdbtn.appendChild(tdbtnvert);
        tdbtnvert.appendChild(text2);
        tdbtnvert.style.color="#F59F26";

        tr.appendChild(td);
        if(Math.round((oldnpvDataExtractor[chart.tooltip.dataPoints[0].dataIndex]*100)/doughnutGroupVal2) == Math.round((chart.tooltip.dataPoints[0].dataset.data[chart.tooltip.dataPoints[0].dataIndex]*100)/doughnutGroupVal) )
       {

       }else{
        tr2.appendChild(tdbtn)
       }
        tableBody.appendChild(tr);
        tableBody.appendChild(tr2);
     
      });
  
      const tableRoot = tooltipEl.querySelector('table');
      tableRoot.style.backgroundColor = '#fff';
      tableRoot.style.opacity = 1;
      tableRoot.style.borderRadius = "10px";
      tableRoot.style.border = 'solid';
      tableRoot.style.borderWidth = '0px';
      tableRoot.style.borderColor = '#000';
  
      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      tableRoot.appendChild(tableBody);
    }
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.backgroundColor = '#fff';

    tooltipEl.style.borderRadius = "5px";
    tooltipEl.style.border = 'solid';
    tooltipEl.style.borderWidth = '0px';
    tooltipEl.style.borderColor = '#000';
    tooltipEl.style.boxShadow = '1px 1px 5px rgba(0, 0, 0, 0.85)';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = '8px';    
    tooltip.onclick = function(){
      console.log("ss")
    };
   
if(chart.tooltip.dataPoints[0].dataIndex == 2){
  tooltipEl.style.left = positionX + tooltip.caretX + (tooltip.width/4)+ 'px';
  tooltipEl.style.top = positionY + tooltip.caretY-tooltipEl.clientHeight + 'px';
}else if(chart.tooltip.dataPoints[0].dataIndex == 0){
  tooltipEl.style.left = positionX + tooltip.caretX + (tooltip.width/4)+ 'px';
  tooltipEl.style.top = positionY + tooltip.caretY-tooltipEl.clientHeight+10 + 'px';
}else{
  tooltipEl.style.left = positionX + tooltip.caretX + (tooltip.width/4)+ 'px';
  tooltipEl.style.top = positionY + tooltip.caretY-tooltipEl.clientHeight + 'px';
}
    
};
  //end


      var changedLabels=[];
      for(label in newlabelExtractor){
        let lbl = newlabelExtractor[label] + " " + Math.round((newnpvDataExtractor[label]*100)/doughnutGroupVal)+"%";
        changedLabels.push(lbl);
      }
      chartData = {
        labels: changedLabels,
        datasets: [
          {
            data: newnpvDataExtractor,
            backgroundColor: doughnutBackgroundColorNEW,
            hoverOffset: 4,
          },
        ],
      };
      chartOptions = {
        maintainAspectRatio: false,
        layout: {
            padding: 10
        },
        responsive: true,
        onClick: (chart) => {
            if(clickableData.includes(chart.chart.tooltip.dataPoints[0].dataIndex)){
                console.log("Trigger event here")
                console.log(chart.chart.tooltip.dataPoints[0].dataIndex)
                //instance.triggerEvent("event_name")  
            }
       },
        cutout: "60%",
        plugins: {
          title: {
            display: true,
            text: parsedData.title,
          color: '#2A2A2A',
            padding: {
              top: 5,
              bottom: -40,
            },
            font: {
              family: 'Jost',
              size: 18,
              weight: "bold",
              lineHeight: 1.2,
              family: 'Jost'
            },
            align: "start",
          },
          subtitle: {
            display: true,
            color: '#2A2A2A',
            text: parsedData.subtitle,
            padding: {
              top: 50,
              bottom: -30,
            },
            font: {
              family: 'Poppins',
              size: 12,
              lineHeight: 1.2,
            },
            align: "start",
          },
          legend: {
            onClick: function (e) {
             
          },
            position: "right",
            display: true,
            labels: {
            boxWidth: 15, 
            padding: 25,
            },
          }, 
          tooltip: {
            enabled: false,
            position: 'nearest',
            external: externalTooltipHandler3
          },
        },
      };
      chartPlugin = [ 
      ];
  
      break;
  case "polar area":
    chart = "polarArea";

    chartData = {
      labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
      datasets: [
        {
          label: "My First Dataset",
          data: [11, 16, 7, 3, 14],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(201, 203, 207)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    };

    chartOptions = {    
      maintainAspectRatio: false,
      layout: {
        padding: 10
    }};
    break;
  case "bubble":
    chart = "bubble";
let extractorBubble = [];
let extractorBubbleTemp = [];
let holdrRNVBubble = [];
let holdPROBABILITYBubble = [];
let holdIRRBubble = [];
let holdYEARSBubble = [];
let largestBubbleValue = 50;

for(let i = 0; i<parsedData.data.length;i++){ 
  parsedData.data[i].assets.forEach(el => holdrRNVBubble.push(el.rNPV))
  parsedData.data[i].assets.forEach(el => holdPROBABILITYBubble.push(el.probability_of_success))
  parsedData.data[i].assets.forEach(el => holdIRRBubble.push(el.IRR))
  parsedData.data[i].assets.forEach(el => holdYEARSBubble.push(el.years_to_launch))
};

let maxIRRBubble = Math.max(...holdIRRBubble);
let maxYEARSBubble = Math.max(...holdYEARSBubble);
let minPROBABILITYBubble = Math.min(...holdPROBABILITYBubble);
let maxPROBABILITYBubble = Math.max(...holdPROBABILITYBubble);
instance.data.maxYEARSBubble = maxYEARSBubble;

let bubbleColorArr = ['rgba(255, 173, 64, 0.2)', 'rgba(255, 230, 197, 0.2)', 'rgba(195, 176, 147, 0.2)', 'rgba(255, 160, 17, 0.2)', 'rgba(156, 100, 16, 0.2)'];
let bubbleBorderColorArr=['rgba(252, 203, 138, 1)','rgba(252, 203, 138, 1)','rgba(218, 123, 21, 1)','rgba(239, 151, 34, 1)','rgba(206, 110, 16, 1)'];

for(let j = 0; j<parsedData.data.length;j++){
  extractorBubbleTemp=[];
  for(let i = 0; i<parsedData.data[j].assets.length;i++){
    let relativeValR = 0;
    if(parsedData.data[j].assets[i].IRR == maxIRRBubble){
      relativeValR = largestBubbleValue;
    }else{
      relativeValR = (largestBubbleValue * parsedData.data[j].assets[i].IRR)/maxIRRBubble;
    }
    extractorBubbleTemp.push(
    {
      x: parsedData.data[j].assets[i].years_to_launch,
      y: parsedData.data[j].assets[i].probability_of_success,
      r: relativeValR
    });
  };
  extractorBubble.push({
    label: parsedData.data[j].indication,
    data: extractorBubbleTemp,
    backgroundColor: bubbleColorArr[j],//"rgba(252, 203, 138,0.5)",
    borderColor: bubbleBorderColorArr[j]
  });
};

instance.data.parsedDatafortooltip = parsedData.data;
    chartData = {
      datasets: extractorBubble
    };
    chartOptions = {
      maintainAspectRatio: false,
      responsive: true,
        layout: {
            padding: 10
        },
        borderWidth:1,
      scales: {
        y: {
          afterDataLimits: function(axis) {
            if(minPROBABILITYBubble <= 25){
              axis.min -= 25-minPROBABILITYBubble; // add 1px to bottom
            }
            if(maxPROBABILITYBubble >= 75){
              let sum = 100 - maxPROBABILITYBubble;
              axis.max += 25-sum; // add 1px to top
            }
         },
         title:{
          display: true,
          text:"Probability of success %",
          color: '#2A2A2A',
          align: 'center',
          font: {
            size: 13,
            family: 'Poppins'
          },
         },
          max: 100,
          beginAtZero: true,
          ticks: {
            stepSize: 10,
            callback: function (value, index, values) {
              return ((value < 0) ||(value > 100)) ? "" : value ;
            },
          },
          grid: {
            display: true,
            borderDash: [2, 2],
          },
        },
        x: {
          title:{
            display: true,
            text:"Time to launch (years)",
            align: 'center',
            color: '#2A2A2A',
            font: {
              size: 13,
              family: 'Poppins'
            },
           },
          ticks: {
            stepSize: 1,
            callback: function (value, index, values) {
              return value < 0 ? "" : value;
            },
          },
          min: -2,
          max: maxYEARSBubble+2,
          // x: 40,
          grid: {
            display: true,
            borderDash: [2, 2],
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          display: true,
          labels: {
            usePointStyle:true,
            pointStyle:'rectRounded',
            padding: 20,
            boxWidth: 16,
            boxHeight: 16,
          },
        },
        tooltip: {
          displayColors: false,
          backgroundColor: "#FFFFFF",
          bodyColor: "#FFFFFF",
          caretSize: 0,
          borderColor: "rgba(152, 152, 152, 0.49)",
          borderWidth: 1,
          titleColor: "#000000",
          titleFont: {
            weight: "bold",
            size: "16px",
          },
          borderRadius: 5,
          titleAlign: "left",
          bodySpacing: 5,
          bodyFont: {
            size: 3,
          },
          padding: {
            left: 8,
            right: 20,
            top: 6,
            bottom: 6,
          },
          footerColor: "#000000",
          footerFont: {
            weight: "normal",
          },
          displayColors: false,
          footerMarginTop: 0,
          titleMarginBottom: 0,
          yAlign: "bottom",
          xAlign: "center",
          callbacks: {
            title: function (context) {
    
              return instance.data.parsedDatafortooltip[context[0].datasetIndex].assets[context[0].dataIndex].label;
            },
            footer: function (context) {
              return `Value: ${instance.data.parsedDatafortooltip[context[0].datasetIndex].assets[context[0].dataIndex].rNPV} ${money}${parsedData.money}\nLikelyhood: ${context[0].dataset.data[context[0].dataIndex].y}%\nTime to launch: ${context[0].dataset.data[context[0].dataIndex].x}\nIRR: ${(instance.data.parsedDatafortooltip[context[0].datasetIndex].assets[context[0].dataIndex].IRR * 100).toFixed(2).replace(/[.,]00$/, "")}%`;
            },
          },
        },
        title: {
          display: true,
          text: 'IRR (Internal Rate of Return)',
          padding: {
            top: 20,
            bottom: 0,
          },
          color: '#2A2A2A',
          font: {
            family: 'Jost',
            size: 18,
            weight: "bold",
            lineHeight: 1.2,
          },
          align: "start",
        },
        subtitle: {
          display: true,
          color: '#2A2A2A',
          text: 'Size of the bubble represents the asset’s IRR',
          color: '#5B5B5B',
          padding: {
            top: 0,
            bottom: 20,
          },
          font: {
            family: 'Poppins',
            size: 12,
            lineHeight: 1.2,
          },
          align: "start",
        },
      },
    };

    if(instanceContainer.clientWidth <= 478){
      chartOptions.scales.x.min = -2;
      chartOptions.scales.x.max = 2;
     
    }



    let xieeq = {       
      afterDatasetsDraw: c => {
      let datasets = c.data.datasets;
      datasets.forEach((e, i) => {  
        //let isHidden = e._meta[0].hidden;
        let isHidden = e.data._chartjs.listeners[0]._cachedMeta.hidden;
        if (!isHidden) {
        let data = c.getDatasetMeta(i).data;
        data.forEach(e => {
          let ctx = c.ctx;
          let x = e.x;
          let y = e.y;
          let r = e.options.radius;
          ctx.save();
          ctx.font = '20px Sans-serif';
          ctx.lineWidth = 1;
          let txt = '+';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#F59F26';
         if((x>=mchart.scales.x.left)&&(mchart.scales.x.right>=x)){
          ctx.fillText(txt, x, y+1.5);
        }
          ctx.restore();
       });
      }
         });
      }
  }
    chartPlugin.push(xieeq)
    break;
  case "scatter":
    chart = "scatter";

    chartData = {
      datasets: [
        {
          label: "Scatter Dataset",
          data: [
            {
              x: -10,
              y: 0,
            },
            {
              x: 0,
              y: 10,
            },
            {
              x: 10,
              y: 5,
            },
            {
              x: 0.5,
              y: 5.5,
            },
          ],
          backgroundColor: "rgb(255, 99, 132)",
        },
      ],
    };

    chartOptions = {
      maintainAspectRatio: false,
        layout: {
            padding: 10
        },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
      },
    };
    break;
  case "lineNew":
    chart = "line";
    var maxVal;
    var parsedDataset1NPV = [];
    var parsedDataset1rNPV = [];
    var parsedDatasetLabels = [];
    var parsedDataset1NPVMain = [];
    var parsedDataset1rNPVMain = [];
    let specialOld;
    let specialNew;
    let specialOldIndex = 0;
    let specialNewIndex = 0;

      parsedDataset1NPV = [];
       parsedDataset1rNPV = [];
       parsedDatasetLabels = [];
      for(let j = 0; j<parsedData.data[0].length;j++){
        parsedDataset1NPV.push(parsedData.data[0][j].NPV)
        parsedDataset1rNPV.push(parsedData.data[0][j].rNPV)
        parsedDatasetLabels.push(parsedData.data[0][j].date)

      }
      parsedDataset1NPVMain.push(parsedDataset1NPV)
      parsedDataset1rNPVMain.push(parsedDataset1rNPV)

//find specials

   var mainDateQuarters2e = [];
    let fullYears2e = [];
    for(let i=0;i<parsedDatasetLabels.length;i++){   
      let data = parsedDatasetLabels[i].substring(0,4);
      if(!fullYears2e.includes(data)){
        fullYears2e.push(data)
      }   
    }; 

    let datasetsGroupedo2NPVnew = [];
    var datasetsGroupedoMain2e =[];
    let datasetsGroupedminiO1 = [];
    let datasetsGroupedminiO1NPV = [];
    let datasetsGroupedo2 = {};
    
    for(let i = 0; i<fullYears2e.length;i++){
      let q1sum =0;
      let q2sum =0;
      let q3sum =0;
      let q4sum =0;
      let q1sumNPV =0;
      let q2sumNPV =0;
      let q3sumNPV =0;
      let q4sumNPV =0;
       datasetsGroupedo2={}
      for(let e = 0;e<parsedData.data[0].length;e++){
      if(parsedData.data[0][e].date.includes(fullYears2e[i])){
      let date2 = parsedData.data[0][e].date
      let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);

      if(parsedData.data[0][e].special == 1){
        let dateF = parsedData.data[0][e].date
        let quarter = Math.floor(new Date(dateF).getMonth() / 3 + 1);
        specialOld = fullYears2e[i] + " Q"+quarter;
      }else if(parsedData.data[0][e].special == 2){
        let dateF = parsedData.data[0][e].date
        let quarter = Math.floor(new Date(dateF).getMonth() / 3 + 1);
        specialNew = fullYears2e[i] + " Q"+quarter;
      };

      if(quarter==1){
        q1sumNPV += parsedData.data[0][e].NPV
        q1sum += parsedData.data[0][e].rNPV
      }else if(quarter == 2){
        q2sumNPV += parsedData.data[0][e].NPV
        q2sum += parsedData.data[0][e].rNPV
        
      }else if(quarter == 3){
        q3sumNPV += parsedData.data[0][e].NPV
        q3sum += parsedData.data[0][e].rNPV
      }else if(quarter == 4){
        q4sumNPV += parsedData.data[0][e].NPV
        q4sum += parsedData.data[0][e].rNPV
      }
      }
    }
      let dt1 = fullYears2e[i] + " Q1";
      let dt2 = fullYears2e[i] + " Q2";
      let dt3 = fullYears2e[i] + " Q3";
      let dt4 = fullYears2e[i] + " Q4";
  
    mainDateQuarters2e.push(dt1)
    mainDateQuarters2e.push(dt2)
    mainDateQuarters2e.push(dt3)
    mainDateQuarters2e.push(dt4)
    datasetsGroupedminiO1.push(q1sum);
    datasetsGroupedminiO1.push(q2sum);
    datasetsGroupedminiO1.push(q3sum);
    datasetsGroupedminiO1.push(q4sum);
    datasetsGroupedminiO1NPV.push(q1sumNPV);
    datasetsGroupedminiO1NPV.push(q2sumNPV);
    datasetsGroupedminiO1NPV.push(q3sumNPV);
    datasetsGroupedminiO1NPV.push(q4sumNPV);
  }

  for(let i = 0; i< mainDateQuarters2e.length;i++){
    if(mainDateQuarters2e[i] ==  specialOld){
      specialOldIndex = i;
    }else if(mainDateQuarters2e[i] ==  specialNew){
      specialNewIndex = i;
    }
  };
  datasetsGroupedo2 ={
    data: datasetsGroupedminiO1,
    fill: false,
    borderColor: function(context) {
      var index = context.dataIndex;
      var value = context.dataset.data[index];
      if(index == specialOldIndex){
        return '#7BD6F2'
      }else if(index == specialNewIndex){
        return 'rgba(245, 159, 38, 1)'
      }else{
        return '#F59F26'
      }
  }, 
    backgroundColor: function(context) {
      var index = context.dataIndex;
      var value = context.dataset.data[index];
      if(index == specialOldIndex){
        return '#7BD6F2'
      }else if(index == specialNewIndex){
        return 'rgba(245, 159, 38, 1)'
      }else{
        return 'rgba(255, 255, 255, 1)'
      }
  }, 
    stepped: false,
    tension: 0.2,
    radius: 4,
    borderWidth: 3.5,
  }
  datasetsGroupedoMain2e.push(datasetsGroupedo2);
  datasetsGroupedo2NPVnew.push(datasetsGroupedminiO1NPV);

    chartData = {
      labels: mainDateQuarters2e, 
      datasets: datasetsGroupedoMain2e
    };
    var line2DataSetOrg = [];
    for(let i=0;i<datasetsGroupedoMain2e.length;i++){
      let orgDatasetLine = datasetsGroupedoMain2e[i].data.map((x) => x);
      line2DataSetOrg.push(orgDatasetLine);
    }

   
    var yearorquarterhandler = 0;

    const getOrCreateTooltipnew = (chart) => {
      let tooltipEl = chart.canvas.parentNode.querySelector('div');
    
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        chart.canvas.parentNode.appendChild(tooltipEl);
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';
    
        const table = document.createElement('table');
        table.style.margin = '0px';
          tooltipEl.appendChild(table);
      }
      return tooltipEl;
    };

    var npvMain =[];
    var rnpvMain =[];
    var newDataSet1ForTooltip =[];
    var newDataSet2ForTooltip = [];
    var newDataSet1ForTooltipr =[];
    var newDataSet2ForTooltipr = [];
    const externalTooltipHandlernew = (context) => {
      // Tooltip Element
      if( !(context.chart.tooltip.dataPoints[0].dataIndex == specialNewIndex) && !(context.chart.tooltip.dataPoints[0].dataIndex == specialOldIndex)){
        return ;
      }
      var extTimer = 1;
      const {chart, tooltip} = context;
      const tooltipEl = getOrCreateTooltipnew(chart);
      
      // Set Text
      if (tooltip.body) {
        //testInstancenew = 0;
        const bodyLines = tooltip.body.map(b => b.lines);
      
        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body, i) => {    
          //rows
          const tr0 = document.createElement('tr');
          tr0.style.backgroundColor = 'inherit';
          tr0.style.borderWidth = 0;
          tr0.style.whiteSpace = "nowrap"
          
          const tr = document.createElement('tr');
          tr.style.backgroundColor = 'inherit';
          tr.style.borderWidth = 0;
          tr.style.whiteSpace = "nowrap"
          
          const tr2 = document.createElement('tr');
          tr2.style.backgroundColor = 'inherit';
          tr2.style.borderWidth = 0;
          tr2.style.whiteSpace = "nowrap"
          
          const tr3 = document.createElement('tr');
          tr3.style.backgroundColor = 'inherit';
          tr3.style.borderWidth = 0;
          tr3.style.whiteSpace = "nowrap"
          //collumns
          const td0 = document.createElement('td');
          td0.style.borderWidth = 0;
          td0.style.color = '#000';
          td0.style.whiteSpace = "nowrap"
          td0.style.fontSize = '12px';
          td0.style.paddingBottom ='3px'
          const td = document.createElement('td');
          td.style.borderWidth = 0;
          td.style.color = '#5b5b5b';
          td.style.width  = '120px'; 
          td.style.minWidth  = '120px'; 
          td.style.fontSize = '12px';
          td.style.whiteSpace = "nowrap"
          td.style.padding ='3px';
         


          const td2 = document.createElement('td');
          td2.style.borderWidth = 0;
          td2.style.whiteSpace = "nowrap"
          td2.style.fontSize = '12px';
          td2.style.color = '#000';
          td2.style.padding ='3px';
          const td3 = document.createElement('td');
          td3.style.borderWidth = 0;
          td3.style.fontSize = '12px';
          td3.style.color = '#000';
          td3.style.whiteSpace = "nowrap"
          td3.style.paddingTop ='3px';

         const tdbtn = document.createElement('button');
         tdbtn.onclick = function () {
           console.log('IT WAS CLICKED')
        }
       tdbtn.style.position = 'relative';
       tdbtn.style.marginTop='4px';
       tdbtn.style.borderWidth = '1px';
       tdbtn.style.border = 'solid';
       tdbtn.style.borderColor = '#F59F26';
       tdbtn.style.borderRadius = '5px';

      
       tdbtn.style.width  = '100%'; 
       tdbtn.style.height  = '40px'; 
       tdbtn.style.fontSize = '12px';
       tdbtn.style.whiteSpace = "nowrap"
       tdbtn.style.padding ='3px';

       var tdbtnvert = document.createElement('div');
       tdbtnvert.style.margin = '0';
       tdbtnvert.style.position = 'absolute';
       tdbtnvert.style.top ='50%';
       tdbtnvert.style.transform = 'translateY(-50%)';
		   tdbtn.style.display='block';
       tdbtn.style.fontFamily = 'Jost';
       tdbtn.style.fontWeight = '600';
       tdbtn.style.fontSize = '16px';
       tdbtn.style.verticalAlign = "bottom";
       tdbtn.style.backgroundColor = '#fff';
       tdbtnvert.style.left = '50%';
       tdbtnvert.style.top = '50%';
       tdbtnvert.style.transform = 'translate(-50%, -50%)';
       tdbtnvert.style.backgroundColor = '#fff';
       // testInstancenew++;
    
          
          //fonts
          td0.style.fontFamily = 'Poppins';
          td.style.fontFamily = 'Poppins';
          td2.style.fontFamily = 'Poppins';
          td3.style.fontFamily = 'Poppins';
          td0.style.fontWeight = "600";
          td2.style.fontWeight = "600";
          td.style.fontWeight = '500';
          td3.style.fontWeight = '500';

          var resE = 0;
           npvMain =[];
           rnpvMain =[];
           //if(testInstancenew == 2){
            //chart.tooltip.dataPoints[0].datasetIndex = 1;
          // }
       if(yearorquarterhandler != 2){

        if(chart.tooltip.dataPoints[0].datasetIndex == 0){
          rnpvMain = datasetsGroupedoMain2e[0].data;
          npvMain = datasetsGroupedoMain2e[0].data
        }else{
          npvMain = datasetsGroupedoMain2e[0].data
          rnpvMain = datasetsGroupedoMain2e[1].data;
        }
       }else{
        if(chart.tooltip.dataPoints[0].datasetIndex == 0){
          npvMain = newDataSet1ForTooltip;
          rnpvMain = newDataSet1ForTooltipr;
        }else{
          npvMain = newDataSet2ForTooltip;
          rnpvMain = newDataSet2ForTooltipr;
        }
       }
    
     

      
        //   if(valIdentificator =='K'){
        //     resE = (rnpvMain[chart.tooltip.dataPoints[0].dataIndex]/1000).toFixed(2) +"K";
        // }else if(valIdentificator == 'M'){
        //   resE = (rnpvMain[chart.tooltip.dataPoints[0].dataIndex]/1000000).toFixed(2)+"M";
        // }else{
          resE = (rnpvMain[chart.tooltip.dataPoints[0].dataIndex]).toFixed(2).replace(/[.,]00$/, "");
        //}

        let res = "";
        let resTemp = 0;            
              if(chart.tooltip.dataPoints[0].dataIndex >= 1){
              //  resTemp = rnpvMain[specialNewIndex] - rnpvMain[specialOldIndex];
                // if(resTemp.toString().length>=4 && resTemp.toString().length < 7 ){
                //   res = (resTemp/1000).toFixed(2) + "K";
                // }else if(resTemp.toString().length>=7){
                //   res = (resTemp/1000000).toFixed(2) +"M"
                // }else{
                  res = rnpvMain[specialNewIndex] - rnpvMain[specialOldIndex];
                //}
              }else{
                resTemp = rnpvMain[chart.tooltip.dataPoints[0].dataIndex];
                res = resTemp;
              }
              let resF ="";
              if(resTemp >0){
                td3.style.color = '#71B560';
                resF = "↗ "+res ;
              }else{
                td3.style.color = '#e04f4f';
                resF = "↙ " + res; 
              }

              let iconDiv = document.createElement('div');
              iconDiv.style.height = '10px';
              iconDiv.style.width = '10px';
              iconDiv.style.display = 'inline-block';
              iconDiv.style.borderRadius = '2px';
              iconDiv.style.backgroundColor = chart.tooltip.labelColors[0].borderColor;
              // if(testInstancenew == 2){
              //   iconDiv.style.backgroundColor = chart.tooltip.labelColors[1].borderColor;
              //   //tdbtn.style.display = 'none';
            
              //   chart.tooltip.dataPoints[0].datasetIndex=0;
              //   testInstancenew = 0;
              // }




       //builder
       const text0 = document.createTextNode('rNPV');
          const text = document.createTextNode(" "+resE +" "+money+parsedData.money);
          const text2 = document.createTextNode('rNPV △');
          const text3 = document.createTextNode(resF+" "+money+parsedData.money);
          td0.appendChild(text0);
          td.appendChild(iconDiv)
          td.appendChild(text);

          td2.appendChild(text2);
          td3.appendChild(text3);

          tr0.appendChild(td0);
          tr.appendChild(td);
          tr2.appendChild(td2);
          tr3.appendChild(td3);
          let text22 = document.createTextNode("View Inputs  →");  //"View Inputs  →"
          tdbtn.appendChild(tdbtnvert);
          tdbtnvert.appendChild(text22);
         if(chartData.datasets.length >1){
            if(chartData.datasets[0].data[chart.tooltip.dataPoints[0].dataIndex] == chartData.datasets[1].data[chart.tooltip.dataPoints[0].dataIndex]){
              tdbtn.style.display ='none';
            }
         }
          tableBody.appendChild(tr0);
          tableBody.appendChild(tr);
          tableBody.appendChild(tr2);
          tableBody.appendChild(tr3);
          tableBody.appendChild(tdbtn);
        });
    
        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.style.backgroundColor = '#fff';
        tableRoot.style.opacity = 1;
        tableRoot.style.borderRadius = "2px";
        tableRoot.style.border = 'solid';
        tableRoot.style.borderWidth = '0px';
        tableRoot.style.borderColor = '#000';
        
        
    
        // Remove old children
        while (tableRoot.firstChild) {
          tableRoot.firstChild.remove();
        }
    
        // Add new children
          if( (chart.tooltip.dataPoints[0].dataIndex == specialNewIndex) || (chart.tooltip.dataPoints[0].dataIndex == specialOldIndex)){
            tableRoot.appendChild(tableBody);
          }
      }
    
      const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

     
      
      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.display  = 'block';
      tooltipEl.style.backgroundColor = '#fff';
      tooltipEl.style.borderRadius = "2px";
      tooltipEl.style.border = 'solid';
      tooltipEl.style.borderWidth = '0px';
      tooltipEl.style.borderColor = '#000';
      tooltipEl.style.boxShadow = '1px 1px 5px black';
      tooltipEl.style.font = tooltip.options.bodyFont.string;
      tooltipEl.style.padding = '8px';    
      var extJAYCY = 0;
      var extJAYCYent = 0;
      tooltipEl.addEventListener('mouseover', (e) => {
      //  testInstancenew = 0;

        extJAYCYent = 1;
        if(extJAYCY != 2){
          tooltipEl.style.display  = 'block';
          tooltipEl.style.opacity = 1;
        }
      });    
      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        setTimeout(function(){
          if (extJAYCYent == 0) {
          tooltipEl.style.display = 'none';
      }
        }, 200);   
        return;
      }
          
 
      
      tooltipEl.addEventListener('mouseleave', (e) => {
        //testInstancenew = 0;

          tooltipEl.style.display  = 'none';
          tooltipEl.style.opacity = 0;
         extJAYCY = 2;
       });
       

      if((tooltipEl.clientHeight+tooltip.caretY+6)<chart.height){
        if(parsedData.data.length == 1){
          tooltipEl.style.left = positionX + tooltip.caretX+45+  'px';
          tooltipEl.style.top = positionY + tooltip.caretY+4+'px';
        }else{
          tooltipEl.style.left = positionX + tooltip.caretX +70+  'px';
          tooltipEl.style.top = positionY + tooltip.caretY +6+'px';
        }
      }else{
        tooltipEl.style.left = positionX + tooltip.caretX +40+'px';
      tooltipEl.style.top = positionY + tooltip.caretY-tooltipEl.clientHeight-2 +'px';
      }
      if(tooltipEl.clientWidth>tooltip.caretX){
        tooltipEl.style.left =tooltip.caretX+(tooltipEl.clientWidth/2)+'px';
      }
      if(chart.width<(tooltip.caretX+tooltipEl.clientWidth)){
        tooltipEl.clientWidth = '136px';
        tooltipEl.style.left =tooltip.caretX-(tooltipEl.clientWidth/1.8)+'px';
      }
      
    };
    let txtForLabel1new = "Asset Value "+money+parsedData.money;

    let switchLegendLine2new = false;
    if(parsedData.data.length == 2){
      switchLegendLine2new = true;
    }
    chartOptions = {
      maintainAspectRatio: false,
      onClick: function(evt, activeElements) {
       console.log(this.data)
        this.update();
      },
      responsive: true,
      layout: {
        padding: {
          top: 10, 
          left: 16, 
          bottom:16, 
          right:40
        }
    },
      scales: {
        x: {
          grid: {
            display: true,
            drawBorder: true,
            borderDash: [2, 2],
          },
        },
        y: {
          title:{
            display: true,
            text:txtForLabel1new,
            color: '#2A2A2A',
            align: 'center',
            font: {
              size: 13,
              family: 'Poppins'
            },
           },
          grid: {
            display: true,
            drawBorder: true,
            borderDash: [2, 2],
          },
          ticks: {
           // stepSize: line2step,
            callback: function (value, index, values) {
              
              if(valIdentificator =='K'){
                  return (value/1000);
              }else if(valIdentificator == 'M'){
                  return (value/1000000);
              }else{
                  return value;
              }
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          display: switchLegendLine2new,
          labels: {
            usePointStyle:true,
            pointStyle:'rectRounded',
            padding: 20,
            boxWidth: 16,
            boxHeight: 16,
          },
        },
        tooltip: {
          enabled: false,
          position: 'nearest',
          external: externalTooltipHandlernew
        },
        title: {
          display: true,
          color: '#2A2A2A',
          text: parsedData.title,
          padding: {
            top: 10,
            bottom: 30,
          },
          font: {
            size: 18,
            weight: "bold",
            family: 'Jost',
            lineHeight: 1.2,
          },
          align: "start",
        }
      },
    };
    break;  
    default:
}

//================================ Chart color fill (background color)
let funcDraw = {
    beforeDraw: (chart) => {
        const {ctx} = chart;
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
}
chartPlugin.push(funcDraw)
const ctx = document.getElementById(mainCanvasID).getContext('2d');
//================================= Chart Generator
var mchart = new Chart(ctx, {
    type: chart,
    data: chartData,
    options: chartOptions,
    plugins: chartPlugin
});
if(chartType == "line"){
  mchart.id = instance.data.updateableChartID;
  instance.data.hummingbirb = mchart;
  instance.data.chartdata = chartData;
}

instance.data.chart = mchart;
instance.data.chartDtaMain = chartData;
instance.data.chartOptMain = chartOptions;
instance.data.chartTypeMain = chartType;
instance.data.instanceContainerMain = instanceContainer;
instance.data.chartParsedDataMain = parsedData.data;

  //======================================================================================================================================
  //=====================================================  CUSTOM THINGS FOR CHARTS  =====================================================
  //======================================================================================================================================
if(chartType == "horizontalBar" && (instanceContainer.clientWidth <= 478)){
  chartOptions.plugins.legend.labels.color = '#FFF';
  chartOptions.plugins.legend.labels.boxWidth = 0;
  chartOptions.plugins.legend.labels.boxHeight = 0;
  let zebraa = document.createElement('div')
  zebraa.style.width = '300px'
  zebraa.style.height = '80px'
  zebraa.style.position = 'absolute';
  zebraa.style.left = '5px'
  zebraa.style.bottom = '10px'
  zebraa.style.zIndex = '10'
  instanceContainer.appendChild(zebraa)
  let table1 = document.createElement('table')
  table1.style.width = '100%'
  table1.style.height = '100%'
  table1.style.fontSize = '12px';
  table1.style.tableLayout = 'fixed';
  table1.style.color = mchart.legend.legendItems[0].fontColor

  for(let i =0;i<mchart.legend.legendItems.length;i++){
  let newtext1 = document.createTextNode(' '+mchart.legend.legendItems[i].text);
  let th1 = document.createElement('th')
  let th2 = document.createElement('th')
  let tr1 = document.createElement('tr')
  let box = document.createElement('div')
  box.style.width = '14px'
  box.style.height = '14px'
  box.style.backgroundColor = mchart.legend.legendItems[i].fillStyle
  box.style.margin = 'auto';
  th1.style.width = '20px'
  th2.style.paddingLeft = '3px'
  th1.style.verticalAlign = 'middle'
  th2.style.verticalAlign = 'middle'
  th1.appendChild(box)
  th2.appendChild(newtext1)
  th2.style.textAlign = 'left'
  tr1.appendChild(th1)
  tr1.appendChild(th2)
  table1.appendChild(tr1)
  }

  zebraa.appendChild(table1)
  mchart.update();
}
if(chartType == "bar"){
let dataArr = mchart.data.datasets[0].data;
let colorBackg = mchart.data.datasets[0].backgroundColor[0];
let colorBackgDark = 'rgba(4, 35, 45,1)';

let colorBackArr = [];
for(let i = 0; i<dataArr.length;i++){
if(dataArr[i] > 0){
  colorBackArr.push(colorBackg)
}else{
  colorBackArr.push(colorBackgDark)

}
}
mchart.data.datasets[0].backgroundColor = colorBackArr;
mchart.data.datasets[0].borderColor = colorBackArr;
mchart.update();
}
if((instanceContainer.clientWidth <= 478)&&(chartType == 'groupedBar')){
  chartOptions.layout.padding ={
    left: 28,
    right: 32,
    top: 45,
    bottom: 5,
  }
  mchart.update();
}

  function afterDrawBarNegative(){
    let dataArr = mchart.data.datasets[0].data;
let colorBackg = mchart.data.datasets[0].backgroundColor[0];
let colorBackgDark = 'rgba(4, 35, 45,1)';

let colorBackArr = [];
for(let i = 0; i<dataArr.length;i++){
if(dataArr[i] > 0){
  colorBackArr.push(colorBackg)
}else{
  colorBackArr.push(colorBackgDark)

}
}
mchart.data.datasets[0].backgroundColor = colorBackArr;
mchart.data.datasets[0].borderColor = colorBackArr;
mchart.update();
  }

  if(chartType == "radar"){
    instance.data.hummingbirbBarRadar = mchart;
    instance.data.chartdata = chartData;
  }
  if(chartType == "bar" ){
    instance.data.hummingbirbBarRadar = mchart;
    instance.data.chartdatae = chartData;
  }
    if(chartType == "bar" ){
    instance.data.hummingbirbBarRadar = mchart;
    instance.data.chartdatae = chartData;
  }

  var step = 5;
  if((instanceContainer.clientWidth <= 478)&&(chartType == 'groupedBar')){
    step = 3;
  }   

  //CHARTTYPE LINE HERE ORIGINALY-----------------------------------------------------------------------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if(chartType == 'line2'){ //quarter button
    var selectDisplayMain = document.createElement("button");
    selectDisplayMain.classList.add("dropbtn");
    var selectDisplay = document.createElement("button");
    selectDisplay.classList.add("dropbtn");
    instanceContainer.appendChild(selectDisplay);
    
    selectDisplayMainID =  makeid(20);
    selectDisplayMain.id = selectDisplayMainID;
    selectDisplayID =  makeid(20);
    selectDisplay.id = selectDisplayID;
    instance.data.selectDisplayMainIDLine2 = selectDisplayMainID;
    instance.data.selectDisplayIDLine2 = selectDisplayID;
  
    selectDisplayMain.innerHTML = 'Quarter ˅';
    instanceContainer.appendChild(selectDisplayMain);
    selectDisplay.innerHTML = 'Year';
    selectDisplay.style.position = 'absolute';
    selectDisplay.style.top = `35px`;
    selectDisplay.style.right =`${90}px`;
    selectDisplay.style.display = 'none';
    selectDisplayMain.style.position = 'absolute';
    selectDisplayMain.style.top = `10px`;
    selectDisplayMain.style.right =`${90}px`;
    selectDisplayMain.style.height = '40px';
    selectDisplayMain.style.width = '90px';
    selectDisplay.style.height = '40px';
    selectDisplay.style.width = '90px';
    selectDisplayMain.style.zIndex = '10';
  
  }  
  if(chartType == 'bar'){
    instance.data.chartoptBAR = chartOptions;
  }
  var entBarData2aORG = chartData.datasets[0].data;
  var entBarData2aORGyears = [];
  var entBarData2aORGyearsLabels = [];
//=======================================================================================BAR CHART BUTTONS
var mobileBubbleCheight = 0;
if(chartType == 'bubble' && instanceContainer.clientWidth <= 478){ 
  chartOptions.layout.padding ={
    left: 30,
    right: 0,
    top: 10,
    bottom: 5,
  }
  mobileBubbleCheight = mchart.scales.x.bottom - mchart.scales.x.maxHeight;
mchart.update();
}
if(chartType == 'bubble' && instanceContainer.clientWidth <= 478){ 
  
  let orgMaxArr = [];
  for(let i = 0; i<parsedData.data.length;i++){ 
    parsedData.data[i].assets.forEach(el => orgMaxArr.push(el.years_to_launch))
  };

  let orgMax = Math.max(...orgMaxArr);
  moveButtonsBubbleMobile(orgMax);
}

  if(chartType == 'bar'){ 
    let lblYears = [];
    moveButtons();
    for(label in labelsBarExtracted){
      let data = labelsBarExtracted[label].substring(0,4);
  
      if(!lblYears.includes(data) && data != ' '){
        lblYears.push(data)
      }   
    };
   
    let currLabels = chartData.labels;

    
    let datasetData = chartData.datasets[0].data;
    let newDataSet =[];
    let newDataSet2 =[];
    let newDataSet3 =[];
    let newDataSetLabels =[];
  for(let j=0;j<lblYears.length;j++){
    let dataAmm = 0;
    let dataAmm2 = 0;
    let dataAmm3 = 0;
    for(let i=0;i<datasetData.length;i++){
      let currLabel = currLabels[i];
      if(currLabel.includes(lblYears[j])){
        dataAmm += datasetData[i];
        dataAmm2 += datasetsGroupedminiO2Minus[i];
        dataAmm3 += datasetsGroupedminiO2Plus[i];
      }
      
    }
    newDataSetLabels.push(lblYears[j])
    newDataSet.push(dataAmm)
    newDataSet2.push(dataAmm2)
    newDataSet3.push(dataAmm3)
  }
    console.log('parsedData')
    console.log(parsedData)
    //instance.data.chartbarOrgLabels = 
    newDataSet1ForTooltip = newDataSet;
    entBarData2aORGyears = newDataSet;
    entBarData2aORGyearsLabels = newDataSetLabels;

    var entBarData2aORGminus = datasetsGroupedminiO2Minus;
    var entBarData2aORGyearsminus =newDataSet2;
    var entBarData2aORGplus = datasetsGroupedminiO2Plus;
    var entBarData2aORGyearsplus = newDataSet3;
    var selectDisplayMain = document.createElement("button");
    selectDisplayMain.classList.add("dropbtn");
    var selectDisplay = document.createElement("button");
    selectDisplay.classList.add("dropbtn");
    instanceContainer.appendChild(selectDisplay);

    selectDisplayMainID =  makeid(20);
    selectDisplayMain.id = selectDisplayMainID;
    selectDisplayID =  makeid(20);
    selectDisplay.id = selectDisplayID;
    instance.data.selectDisplayMainIDLine2 = selectDisplayMainID;
    instance.data.selectDisplayIDLine2 = selectDisplayID;

    selectDisplayMain.innerHTML = 'Quarter ˅';
    instanceContainer.appendChild(selectDisplayMain);
    instanceContainer.style.position = 'relative'
    selectDisplay.innerHTML = 'Year';
    selectDisplay.style.position = 'absolute';
    selectDisplay.style.top = `35px`;
    selectDisplay.style.display = 'none';
    selectDisplayMain.style.position = 'absolute';
    selectDisplayMain.style.top = `10px`;
    selectDisplayMain.style.height = '40px';
    selectDisplayMain.style.width = '90px';
    selectDisplay.style.height = '40px';
    selectDisplay.style.width = '90px';
    selectDisplayMain.style.zIndex = '10';
    var wacc1btn = document.createElement("button");
    wacc1btn.classList.add("button");
    wacc1btn.id = makeid(23);
    instance.data.clickedbutton = wacc1btn.id;
    wacc1btn.innerHTML = parsedData.name
    wacc1btn.style.left = `${mchart.width - 235}px`;//pos
    wacc1btn.style.zIndex = '10';
    var wacc2btn = document.createElement("button");
    wacc2btn.classList.add("button");
    wacc2btn.id = makeid(23);
    instance.data.clickedbuttonWACC2 = wacc2btn.id;
    wacc2btn.innerHTML = parsedData.name+' -'+parsedData.percentage+"%";
    wacc2btn.style.zIndex = '10';
    var wacc3btn = document.createElement("button");
    wacc3btn.classList.add("button");
    wacc3btn.id = makeid(23);
    instance.data.clickedbuttonWACC3 = wacc3btn.id;
    wacc3btn.innerHTML = parsedData.name+' +'+parsedData.percentage+"%";
    wacc3btn.style.zIndex = '10';  
    var clickedbutton = 'wacc'
    wacc1btn.style.backgroundColor = '#F59F26'
    wacc1btn.style.color = '#fff'
    var waccContainer22fga = document.createElement("span");
    waccContainer22fga.classList.add("btnContainerPluginTop");
    waccContainer22fga.style.top = '15px';
    waccContainer22fga.style.height = `30px`;
    waccContainer22fga.style.position = 'absolute';
    waccContainer22fga.style.right = `80px`;//pos
    waccContainer22fga.style.zIndex = '12';
    instanceContainer.appendChild(waccContainer22fga);
      
       waccContainer22fga.appendChild(wacc2btn);
       waccContainer22fga.appendChild(wacc1btn);
       waccContainer22fga.appendChild(wacc3btn);
       
       //functions
    selectDisplayMain.onclick = function () {
      selectDisplay.style.display = 'block';
     mchart.update();
    }

    selectDisplay.onclick = function () {
    selectDisplay.style.display = 'none';

      if(selectDisplayMain.innerHTML == 'Quarter ˅'){
        selectDisplayMain.innerHTML = 'Year ˅';
        selectDisplay.innerHTML = 'Quarter';
        clickedbutton = 'wacc';
        wacc1btn.style.color = '#FFF'
        wacc2btn.style.color = '#F59F26'
        wacc3btn.style.color = '#F59F26'
        wacc1btn.style.backgroundColor = '#F59F26'
        wacc2btn.style.backgroundColor = '#FFFFFF'
        wacc3btn.style.backgroundColor = '#FFFFFF'
        if(instance.data.test1aMINUS.length != 0){
          entBarData2aORGminus = instance.data.test1aMINUS;
          entBarData2aORGplus = instance.data.test1aPLUS;
          entBarData2aORG = instance.data.test1aORG;
          entBarData2aORGyearsLabels = instance.data.newDataSetLabels;
          entBarData2aORGyears = instance.data.newDataSet;
          entBarData2aORGyearsminus = instance.data.newDataSet2;
          entBarData2aORGyearsplus = instance.data.newDataSet3;
       }
        if(clickedbutton == 'wacc'){
            chartData.labels = entBarData2aORGyearsLabels;
            chartData.datasets[0].data = entBarData2aORGyears;
            let z = Math.min(...entBarData2aORGyears);
            if(z<0){
              chartOptions.scales.y.min = z
            }else{
              chartOptions.scales.y.min = 0
            }
            let maxDataYbare = Math.round(Math.max(...entBarData2aORGyears));
            let maxValueBare = Math.round(maxDataYbare/rounderValue)*rounderValue;
            chartOptions.scales.y.max = maxValueBare
    
            
        }
        chartOptions.scales.x.min = 0;
        
        chartOptions.scales.x.max = 5;
        yearorquarterhandler = 2;

      mchart.update();
      }else{
        clickedbutton = 'wacc';
        wacc1btn.style.color = '#FFF'
        wacc2btn.style.color = '#F59F26'
        wacc3btn.style.color = '#F59F26'
        wacc1btn.style.backgroundColor = '#F59F26'
        wacc2btn.style.backgroundColor = '#FFFFFF'
        wacc3btn.style.backgroundColor = '#FFFFFF'




        if(clickedbutton == 'wacc'){
            chartData.labels = instance.data.mainDateQuarters2eBar;
            chartData.datasets[0].data = entBarData2aORG;
            let z =  Math.min(...entBarData2aORG)
            if(z<0){
              chartOptions.scales.y.min = z
            }else{
              chartOptions.scales.y.min = 0
            }
            chartOptions.scales.y.max = Math.max(...entBarData2aORG)
            let maxDataYbare = Math.round(Math.max(...entBarData2aORG));
            let maxValueBare = Math.round(maxDataYbare/rounderValue)*rounderValue;
            chartOptions.scales.y.max = maxValueBare
        }else if(clickedbutton == 'wacc2'){

            chartData.labels = instance.data.mainDateQuarters2eBar;
            chartData.datasets[0].data = entBarData2aORGminus;
            
            let z =  Math.min(...entBarData2aORGminus)
            if(z<0){
              chartOptions.scales.y.min = z
            }else{
              chartOptions.scales.y.min = 0
            }
            chartOptions.scales.y.max = Math.max(...entBarData2aORGminus)

            let maxDataYbare = Math.round(Math.max(...entBarData2aORGminus));
            let maxValueBare = Math.round(maxDataYbare/rounderValue)*rounderValue;
            chartOptions.scales.y.max = maxValueBare

        }else if(clickedbutton == 'wacc3'){
            chartData.labels = instance.data.mainDateQuarters2eBar;
            chartData.datasets[0].data = entBarData2aORGplus;
            let z =  Math.min(...entBarData2aORGplus)
            if(z<0){
              chartOptions.scales.y.min = z
            }else{
              chartOptions.scales.y.min = 0
            }
            chartOptions.scales.y.max = Math.max(...entBarData2aORGplus)

            let maxDataYbare = Math.round(Math.max(...entBarData2aORGplus));
            let maxValueBare = Math.round(maxDataYbare/rounderValue)*rounderValue;
            chartOptions.scales.y.max = maxValueBare

        }
        chartOptions.scales.x.min = 0;
        chartOptions.scales.x.max = 5;
        
        let maxDataYbare = Math.round(Math.max(...entBarData2aORG));
        let maxValueBare = Math.round(maxDataYbare/rounderValue)*rounderValue;
        chartOptions.scales.y.max = maxValueBare
 

        yearorquarterhandler = 1;
        selectDisplayMain.innerHTML = 'Quarter ˅';
        selectDisplay.innerHTML = 'Year';

        mchart.update();
      };

      
      if(chartData.datasets[0].data.length < 7){
        deleteMoveButtons();
       }else{
        moveButtons();
       }
       afterDrawBarNegative();
  }

    wacc1btn.onclick = function () {
      if(instance.data.test1aMINUS.length != 0){
        entBarData2aORGminus = instance.data.test1aMINUS;
        entBarData2aORGplus = instance.data.test1aPLUS;
        entBarData2aORG = instance.data.test1aORG;
        entBarData2aORGyearsLabels = instance.data.newDataSetLabels;
        entBarData2aORGyears = instance.data.newDataSet;
        entBarData2aORGyearsminus = instance.data.newDataSet2;
        entBarData2aORGyearsplus = instance.data.newDataSet3;
     }
      if(clickedbutton == 'wacc'){}else{
      if(yearorquarterhandler == 2){
        chartData.datasets[0].data = entBarData2aORGyears;
        let z =  Math.min(...entBarData2aORGyears)
        if(z<0){
          chartOptions.scales.y.min = z
        }else{
          chartOptions.scales.y.min = 0
        }
        let maxDataYbare = Math.round(Math.max(...entBarData2aORGyears));
        let maxValueBare = Math.round(maxDataYbare/rounderValue)*rounderValue;
        chartOptions.scales.y.max = maxValueBare
      }else{
        chartData.datasets[0].data = entBarData2aORG;
        let z =  Math.min(...entBarData2aORG)
        if(z<0){
          chartOptions.scales.y.min = z
        }else{
          chartOptions.scales.y.min = 0
        }
        let maxDataYbare = Math.round(Math.max(...entBarData2aORG));
        let maxValueBare = Math.round(maxDataYbare/rounderValue)*rounderValue;
        chartOptions.scales.y.max = maxValueBare
      }
      clickedbutton = 'wacc';
      wacc1btn.style.color = '#FFF'
      wacc2btn.style.color = '#F59F26'
      wacc3btn.style.color = '#F59F26'
      wacc1btn.style.backgroundColor = '#F59F26'
      wacc2btn.style.backgroundColor = '#FFFFFF'
      wacc3btn.style.backgroundColor = '#FFFFFF'
      mchart.update();   
      }
  };
    wacc2btn.onclick = function () {
      if(clickedbutton == 'wacc2'){}else{

        if(yearorquarterhandler == 2){
            chartData.datasets[0].data = entBarData2aORGyearsminus;
            let z =  Math.min(...entBarData2aORGyearsminus)
            if(z<0){
              chartOptions.scales.y.min = z
            }else{
              chartOptions.scales.y.min = 0
            }
            chartOptions.scales.y.max = Math.max(...entBarData2aORGyearsminus)
          }else{
            if(instance.data.test1aMINUS.length != 0){
              entBarData2aORGminus = instance.data.test1aMINUS;
              entBarData2aORGplus = instance.data.test1aPLUS;
              entBarData2aORG = instance.data.test1aORG;
              entBarData2aORGyearsLabels = instance.data.newDataSetLabels;
              entBarData2aORGyears = instance.data.newDataSet;
              entBarData2aORGyearsminus = instance.data.newDataSet2;
              entBarData2aORGyearsplus = instance.data.newDataSet3;
           }
            chartData.datasets[0].data = entBarData2aORGminus;
            let z =  Math.min(...entBarData2aORGminus)
            if(z<0){
              chartOptions.scales.y.min = z
            }else{
              chartOptions.scales.y.min = 0
            }
            chartOptions.scales.y.max = Math.max(...entBarData2aORGminus)
          }
      clickedbutton = 'wacc2';

      wacc1btn.style.backgroundColor = '#FFFFFF'
      wacc2btn.style.backgroundColor = '#F59F26'
      wacc1btn.style.color = '#F59F26'
      wacc2btn.style.color = '#fff'
      wacc3btn.style.color = '#F59F26'
      wacc3btn.style.backgroundColor = '#FFFFFF'
      mchart.update();   
      }
  };
    wacc3btn.onclick = function () {
      if(clickedbutton == 'wacc3'){}else{
        if(instance.data.test1aMINUS.length != 0){
          entBarData2aORGminus = instance.data.test1aMINUS;
          entBarData2aORGplus = instance.data.test1aPLUS;
          entBarData2aORG = instance.data.test1aORG;
          entBarData2aORGyearsLabels = instance.data.newDataSetLabels;
          entBarData2aORGyears = instance.data.newDataSet;
          entBarData2aORGyearsminus = instance.data.newDataSet2;
          entBarData2aORGyearsplus = instance.data.newDataSet3;
       }
            if(yearorquarterhandler == 2){
                chartData.datasets[0].data = entBarData2aORGyearsplus;
                let z =  Math.min(...entBarData2aORGyearsplus)
                if(z<0){
                  chartOptions.scales.y.min = z
                }else{
                  chartOptions.scales.y.min = 0
                }
                chartOptions.scales.y.max = Math.max(...entBarData2aORGyearsplus)
              }else{
                chartData.datasets[0].data = entBarData2aORGplus;
                let z =  Math.min(...entBarData2aORGplus)
                if(z<0){
                  chartOptions.scales.y.min = z
                }else{
                  chartOptions.scales.y.min = 0
                }
                chartOptions.scales.y.max = Math.max(...entBarData2aORGplus)
              }
      clickedbutton = 'wacc3';
      wacc1btn.style.backgroundColor = '#FFFFFF'
      wacc2btn.style.backgroundColor = '#FFFFFF'
      wacc1btn.style.color = '#F59F26'
      wacc2btn.style.color = '#F59F26'
      wacc3btn.style.color = '#fff'
      wacc3btn.style.backgroundColor = '#F59F26'
      mchart.update();   
      }
  };
  }
  //=======================================================================================GROUPED BAR CHART BUTTONS
  if(chartType == 'groupedBar'){
    moveButtons();
    let yearorquarterhandlerGrouped = 1;
    let entBarData2aORGyearsG = [];
    let entBarData2aORGyears2G = [];
    let datasetDataHolder = [];
    let datasetDataHolderOriginal = [];
    let numbersCopy = []
    for(let i =0;i<chartData.datasets.length;i++){
      datasetDataHolder.push(chartData.datasets[i].data);
     numbersCopy = chartData.datasets[i].data.map((x) => x);
    datasetDataHolderOriginal.push(numbersCopy)
    };
    
    let lblYears = [];
    for(label in mainDateQuarters2){
      let data = mainDateQuarters2[label].substring(0,4);
      if(!lblYears.includes(data) && data != ' '){
        lblYears.push(data)
      }   
    };
   
    let currLabels = mainDateQuarters2;
    let newDataSet =[];

  
  let dataAmm0 = 0;
  let newDataSet0 = [];
  let newDataSet021 = [];
  let newDataSetHolder = [];

  for(let a=0;a<datasetDataHolder.length;a++){
    newDataSet0 = [];
    for(let j=0;j<lblYears.length;j++){
      dataAmm0 = 0;
      for(let i=0;i<datasetDataHolder[a].length;i++){
        let currLabel = currLabels[i];
      if(currLabel.includes(lblYears[j])){
        dataAmm0 += datasetDataHolder[a][i];
      }
      }
      newDataSet0.push(dataAmm0);
      newDataSet021.push(dataAmm0)
    }
    newDataSetHolder.push({
      label:parsedData.data[a].name,
      data: newDataSet0,
      backgroundColor:colorsNewArrBlue2[a],
      borderColor:"#FFFFFF"
   })
  }




       newDataSet1ForTooltip = newDataSet;
       var selectDisplayMain = document.createElement("button");
       selectDisplayMain.classList.add("dropbtn");
       var selectDisplay = document.createElement("button");
      
       selectDisplay.classList.add("dropbtn");
       instanceContainer.appendChild(selectDisplay);
       
       selectDisplayMainID =  makeid(20);
       selectDisplayMain.id = selectDisplayMainID;
       selectDisplayID =  makeid(20);
       selectDisplay.id = selectDisplayID;
       instance.data.selectDisplayMainIDLine2 = selectDisplayMainID;
       instance.data.selectDisplayIDLine2 = selectDisplayID;

       selectDisplayMain.innerHTML = 'Quarter ˅';
       instanceContainer.appendChild(selectDisplayMain);
       selectDisplay.innerHTML = 'Year';
       selectDisplay.style.position = 'absolute';
       selectDisplay.style.top = `35px`;
       selectDisplay.style.right =`90px`;//pos
       //selectDisplay.style.left =`${mchart.width - 90}px`;//pos
       selectDisplay.style.display = 'none';
       selectDisplayMain.style.position = 'absolute';
       selectDisplayMain.style.top = `10px`;
       selectDisplayMain.style.left =`${mchart.width - 90}px`;
       selectDisplayMain.style.height = '40px';
       selectDisplayMain.style.width = '90px';
       selectDisplay.style.height = '40px';
       selectDisplay.style.width = '90px';
       selectDisplayMain.style.zIndex = '10';

  //============================================functions
    selectDisplayMain.onclick = function () {
      selectDisplay.style.display = 'block';
     mchart.update();
    }

    selectDisplay.onclick = function () {
    selectDisplay.style.display = 'none';
        //set auto button to orginal wacc data after change of data display
        clickedbutton = 'wacc';
    
      if(selectDisplayMain.innerHTML == 'Quarter ˅'){
        selectDisplayMain.innerHTML = 'Year ˅';
        selectDisplay.innerHTML = 'Quarter';
       
        //CLICKED BUTTONS
        chartData.labels = lblYears;
        chartOptions.scales.x.min = 0;
        chartOptions.scales.x.max = 3;
        yearorquarterhandlerGrouped = 2;
        chartData.datasets = newDataSetHolder;
        let dbtkk = Math.min(...newDataSet021);
        if(dbtkk < 0){
          chartOptions.scales.y.min = dbtkk
        }else{
          chartOptions.scales.y.min = 0
        }
      
        chartOptions.scales.y.max = Math.max(...newDataSet021)
      mchart.update();
      }else{
        
        yearorquarterhandlerGrouped = 1;
        chartOptions.scales.x.min = 0;
        chartOptions.scales.x.max = 3;
        chartData.labels =mainDateQuarters2; 

        let orgDta = [];
        for(let i = 0; i<chartData.datasets.length;i++){
          orgDta.push({
            label:parsedData.data[i].name,
            data: datasetDataHolderOriginal[i],
            backgroundColor:colorsNewArrBlue2[i],
            borderColor:"#FFFFFF"
         })
        }
        chartData.datasets = orgDta;
        selectDisplayMain.innerHTML = 'Quarter ˅';
        selectDisplay.innerHTML = 'Year';
        let huhgunuinui = [];

        for(let i = 0; i< datasetDataHolderOriginal.length;i++){
          datasetDataHolderOriginal[i].forEach(el => huhgunuinui.push(el))
        };

        let dbtkke = Math.min(...huhgunuinui)
        if(dbtkke < 0){
          chartOptions.scales.y.min = dbtkke
        }else{
          chartOptions.scales.y.min = 0
        }

        chartOptions.scales.y.max = Math.max(...huhgunuinui)

        mchart.update();
      }

      if(chartData.datasets[0].data.length < 7){
        deleteMoveButtons();
       }else{
        moveButtons();
       }
  }
  

  }

  function moveButtonsBubbleMobile(orgMax){
    let step = 3;
    let allChildren = instanceContainer.querySelectorAll('.moveBTN');
    if(allChildren.length == 0){
      var moveLeftBtn = document.createElement("button");
      moveLeftBtn.classList.add("moveBTN");
      var moveLeftBtnID =  makeid(20);
      moveLeftBtn.id = moveLeftBtnID;
      moveLeftBtn.innerHTML = '';
      moveLeftBtn.style.position = 'absolute';
      moveLeftBtn.style.top = `${((mchart.chartArea.bottom - mchart.chartArea.top)/2)-14+mchart.chartArea.top}px`; //`${mchart.height/2 - 20}px`;
      moveLeftBtn.style.left =`5px`;
      moveLeftBtn.style.display = 'none'
      moveLeftBtn.style.height  = '28px';
      moveLeftBtn.style.width   = '28px';
      moveLeftBtn.style.zIndex  = '10';
  
      var moveRightBtnInner = document.createElement("button");
      moveRightBtnInner.classList.add("specialArrowBtnMove");
      moveRightBtnInner.style.position = 'relative';
      moveRightBtnInner.style.top      = `0px`;
      moveRightBtnInner.style.left    = '-5px';
      moveRightBtnInner.style.right    = '-10px';
      moveRightBtnInner.style.zIndex   = '10';
      moveRightBtnInner.style.display  = 'block'
  
      var moveweLeftBtnInner = document.createElement("button");
      moveweLeftBtnInner.classList.add("specialArrowBtnMoveLeft");
      moveweLeftBtnInner.style.position = 'relative';
      moveweLeftBtnInner.style.top       = `0px`;
      moveweLeftBtnInner.style.left      = '-3px';
      moveweLeftBtnInner.style.zIndex   = '10';
      moveweLeftBtnInner.style.display  = 'block'
  
      var moveRightBtn = document.createElement("button");
      moveRightBtn.classList.add("moveBTN");
      moveRightBtn.innerHTML = '';
      moveRightBtn.style.position = 'absolute';
      moveRightBtn.style.top = `${((mchart.chartArea.bottom - mchart.chartArea.top)/2)-14+mchart.chartArea.top}px`;
      moveRightBtn.style.right = '5px';
      moveRightBtn.style.zIndex = '10';
      moveRightBtn.style.display = 'block'
      moveRightBtn.style.height = '28px';
      moveRightBtn.style.width = '28px';
      
      moveRightBtn.appendChild(moveRightBtnInner);
      moveLeftBtn.appendChild(moveweLeftBtnInner);
      instanceContainer.appendChild(moveLeftBtn);
      instanceContainer.appendChild(moveRightBtn);
  
      
  moveLeftBtn.onclick = function () {
    if(chartOptions.scales.x.min >= step){
        chartOptions.scales.x.min -= step;
        chartOptions.scales.x.max -= step;
        moveRightBtn.style.display = 'block';
        if(chartOptions.scales.x.min <= -2){
      moveLeftBtn.style.display = 'none'
        }
    }else{
        chartOptions.scales.x.min = -2;
        chartOptions.scales.x.max = step;
      moveLeftBtn.style.display = 'none'
      moveRightBtn.style.display = 'block'
  
    }
  
      mchart.update();
    }
}


moveRightBtn.onclick = function () {

  let suma = chartOptions.scales.x.max+step; 
  if(suma <= orgMax){
      chartOptions.scales.x.min = chartOptions.scales.x.max;
      chartOptions.scales.x.max += step;
  }else{
    chartOptions.scales.x.min = orgMax-step;
    chartOptions.scales.x.max = orgMax+2;
    moveRightBtn.style.display = 'none'
  }

  if(chartOptions.scales.x.min == -2){
    moveLeftBtn.style.display = 'none'
  }else{
    moveLeftBtn.style.display = 'block'
  }
  console.log('chartOptions.scales.x.min')
  console.log(chartOptions.scales.x.min)

    mchart.update();
  }
}
   function moveButtons(){
    let allChildren = instanceContainer.querySelectorAll('.moveBTN');
    if(allChildren.length == 0){
      var moveLeftBtn = document.createElement("button");
      moveLeftBtn.classList.add("moveBTN");
      var moveLeftBtnID =  makeid(20);
      moveLeftBtn.id = moveLeftBtnID;
      moveLeftBtn.innerHTML = '';
      moveLeftBtn.style.position = 'absolute';
      moveLeftBtn.style.top = `${mchart.height/2 - 20}px`;
      moveLeftBtn.style.right =`${mchart.width - 45}px`;
      moveLeftBtn.style.display = 'none'
      moveLeftBtn.style.height  = '40px';
      moveLeftBtn.style.width   = '40px';
      moveLeftBtn.style.zIndex  = '10';
  
      var moveRightBtnInner = document.createElement("button");
      moveRightBtnInner.classList.add("specialArrowBtnMove");
      moveRightBtnInner.style.position = 'relative';
      moveRightBtnInner.style.top      = `0px`;
      moveRightBtnInner.style.left    = '-1px';
      moveRightBtnInner.style.zIndex   = '10';
      moveRightBtnInner.style.display  = 'block'
  
      var moveweLeftBtnInner = document.createElement("button");
      moveweLeftBtnInner.classList.add("specialArrowBtnMoveLeft");
      moveweLeftBtnInner.style.position = 'relative';
      moveweLeftBtnInner.style.top       = `0px`;
      moveweLeftBtnInner.style.left      = '3px';
      moveweLeftBtnInner.style.zIndex   = '10';
      moveweLeftBtnInner.style.display  = 'block'
  
      var moveRightBtn = document.createElement("button");
      moveRightBtn.classList.add("moveBTN");
      moveRightBtn.innerHTML = '';
      moveRightBtn.style.position = 'absolute';
      moveRightBtn.style.top = `${mchart.height/2 - 20}px`;
            var moveRightBtnID =  makeid(20);
    moveRightBtn.id = moveRightBtnID;
        instance.data.moveRightBtnID=moveRightBtnID;
        instance.data.moveRightBtn=moveRightBtn;
      moveRightBtn.style.right = '5px';
      moveRightBtn.style.zIndex = '10';
      moveRightBtn.style.display = 'block'
      moveRightBtn.style.height = '40px';
      moveRightBtn.style.width = '40px';
      
      moveRightBtn.appendChild(moveRightBtnInner);
      moveLeftBtn.appendChild(moveweLeftBtnInner);
      instanceContainer.appendChild(moveLeftBtn);
      instanceContainer.appendChild(moveRightBtn);
  
      if(instanceContainer.clientWidth <= 478){
        moveLeftBtn.style.top = `${((mchart.chartArea.bottom - mchart.chartArea.top)/2)-14+mchart.chartArea.top}px`; 
        moveLeftBtn.style.left =`5px`;
        moveLeftBtn.style.height  = '28px';	//THIS EDIT THIS GOD DAMNIT
        moveLeftBtn.style.width   = '28px';
        moveweLeftBtnInner.style.left      = '-3px';
 
        moveRightBtnInner.style.left    = '-5px';	
        moveRightBtnInner.style.right    = '-10px';
        moveRightBtn.style.top = `${((mchart.chartArea.bottom - mchart.chartArea.top)/2)-14+mchart.chartArea.top}px`;
        moveRightBtn.style.height = '28px';	
        moveRightBtn.style.width = '28px';
        moveLeftBtn.style.right =`5px`;
      }
      
  moveLeftBtn.onclick = function () {
   
    if(chartOptions.scales.x.min >= step){
        chartOptions.scales.x.min -= step;
        chartOptions.scales.x.max -= step;
        moveRightBtn.style.display = 'block';
        if(chartOptions.scales.x.min <= 0){
      moveLeftBtn.style.display = 'none'
  
        }
    }else{
        chartOptions.scales.x.min = 0;
        chartOptions.scales.x.max = step;
      moveLeftBtn.style.display = 'none'
      moveRightBtn.style.display = 'block'
  
    }
  
      mchart.update();
    }
}

moveRightBtn.onclick = function () {
  if(chartOptions.scales.x.min = 0){
    moveLeftBtn.style.display = 'none'
  }else{
    moveLeftBtn.style.display = 'block'
  }
  let suma =(chartOptions.scales.x.max+step); 
 
  
  if(suma >= chartData.datasets[0].data.length){
      chartOptions.scales.x.min = chartData.datasets[0].data.length-step;
      chartOptions.scales.x.max = chartData.datasets[0].data.length;
moveRightBtn.style.display = 'none'

  }else{
      chartOptions.scales.x.min = chartOptions.scales.x.max;
      chartOptions.scales.x.max += step;
  }
    mchart.update();
  }
}
   function deleteMoveButtons(){
    let allChildren = instanceContainer.querySelectorAll('.moveBTN');
    allChildren.forEach(el => el.remove());
   }
//=======================================================================================DOUGHNUT BUTTONS
 if(chartType == 'doughnut-pie'){
    let cntrText = document.createElement("div");
    cntrTextID =  makeid(20);
    cntrText.id = cntrTextID;
    instanceContainer.appendChild(cntrText);
    cntrText.style.position = 'absolute';
    cntrText.style.textAlign = 'center';
    let newtext = document.createTextNode(centerValue);
    cntrText.style.fontFamily = 'Jost';
    cntrText.style.fontSize = '14px';
    cntrText.style.fontWeight = '600';

    cntrText.appendChild(newtext);
    cntrText.style.top = `${mchart.chartArea.top+mchart.chartArea.height/2 - (cntrText.clientHeight/2)}px`;
    cntrText.style.left = `${mchart.chartArea.left+mchart.chartArea.width/2 - (cntrText.clientWidth/2)}px`;
 }
//=======================================================================================DOUGHNUT - DIFF BUTTONS
 if(chartType == 'doughnut-pie-diff'){
    let cntrText2ef = document.createElement("p");
    instanceContainer.appendChild(cntrText2ef);
    cntrText2ef.style.position = 'absolute';
    let newtexte = document.createTextNode(centerValue);
    cntrText2ef.style.fontFamily = 'Jost';
    cntrText2ef.style.fontSize = '14px';
    cntrText2ef.style.fontWeight = '600';
    cntrText2ef.appendChild(newtexte);
    cntrText2ef.style.top = `${mchart.chartArea.top+mchart.chartArea.height/2- (cntrText2ef.clientHeight/2)}px`;
    cntrText2ef.style.left = `${mchart.chartArea.left+mchart.chartArea.width/2- (cntrText2ef.clientWidth/2)}px`;
 }
 instance.publishState('Transfer',false);
 instance.data.runOnce = true;
}
//=============================================RESPONSIVENESS OF CHARTS
//=============================================RESPONSIVENESS OF BUBBLE CHART
if(instance.data.chartTypeMain == 'bubble' && instance.data.instanceContainerMain.clientWidth <= 478){ 

instance.data.chartOptMain.layout.padding ={
  left: 30,
  right: 0,
  top: 10,
  bottom: 5,
}
let orgMaxArr = [];
for(let i = 0; i<instance.data.chartParsedDataMain.length;i++){ 
  instance.data.chartParsedDataMain[i].assets.forEach(el => orgMaxArr.push(el.years_to_launch))
};

let orgMax = Math.max(...orgMaxArr);
moveButtonsBubbleMobileUPDT(orgMax);
instance.data.chart.config._config.options.scales.x.min= -2;
instance.data.chart.config._config.options.scales.x.max= 2;
instance.data.chart.config._config.options.maintainAspectratio = false;
instance.data.chart._aspectRatio = 1

instance.data.chart.resize();
instance.data.chart.update();

function moveButtonsBubbleMobileUPDT(orgMax){
  let step = 3;
  let allChildren = instance.data.instanceContainerMain.querySelectorAll('.moveBTN');

  if(allChildren.length == 0){
    var moveLeftBtn = document.createElement("button");
    moveLeftBtn.classList.add("moveBTN");
    var moveLeftBtnID =  makeid(20);
    moveLeftBtn.id = moveLeftBtnID;
    moveLeftBtn.innerHTML = '';
    moveLeftBtn.style.position = 'absolute';
    moveLeftBtn.style.top = `${((instance.data.chart.chartArea.bottom - instance.data.chart.chartArea.top)/2)-14+instance.data.chart.chartArea.top}px`; //`${mchart.height/2 - 20}px`;
    moveLeftBtn.style.left =`5px`;
    moveLeftBtn.style.display = 'none'
    moveLeftBtn.style.height  = '28px';
    moveLeftBtn.style.width   = '28px';
    moveLeftBtn.style.zIndex  = '10';

    var moveRightBtnInner = document.createElement("button");
    moveRightBtnInner.classList.add("specialArrowBtnMove");
    moveRightBtnInner.style.position = 'relative';
    moveRightBtnInner.style.top      = `0px`;
    moveRightBtnInner.style.left    = '-5px';
    moveRightBtnInner.style.right    = '-10px';
    moveRightBtnInner.style.zIndex   = '10';
    moveRightBtnInner.style.display  = 'block'

    var moveweLeftBtnInner = document.createElement("button");
    moveweLeftBtnInner.classList.add("specialArrowBtnMoveLeft");
    moveweLeftBtnInner.style.position = 'relative';
    moveweLeftBtnInner.style.top       = `0px`;
    moveweLeftBtnInner.style.left      = '-3px';
    moveweLeftBtnInner.style.zIndex   = '10';
    moveweLeftBtnInner.style.display  = 'block'

    var moveRightBtn = document.createElement("button");
    moveRightBtn.classList.add("moveBTN");
    moveRightBtn.innerHTML = '';
    moveRightBtn.style.position = 'absolute';
    var moveRightBtnID =  makeid(20);
    moveRightBtn.id = moveRightBtnID;
    moveRightBtn.style.top = `${((instance.data.chart.chartArea.bottom - instance.data.chart.chartArea.top)/2)-14+instance.data.chart.chartArea.top}px`;
    moveRightBtn.style.right = '5px';
    moveRightBtn.style.zIndex = '10';
    moveRightBtn.style.display = 'block'
    moveRightBtn.style.height = '28px';
    moveRightBtn.style.width = '28px';
    
    moveRightBtn.appendChild(moveRightBtnInner);
    moveLeftBtn.appendChild(moveweLeftBtnInner);
    instance.data.instanceContainerMain.appendChild(moveLeftBtn);
    instance.data.instanceContainerMain.appendChild(moveRightBtn);

    
moveLeftBtn.onclick = function () {
  if(instance.data.chartOptMain.scales.x.min >= step){
    instance.data.chartOptMain.scales.x.min -= step;
    instance.data.chartOptMain.scales.x.max -= step;
      moveRightBtn.style.display = 'block';
      if(instance.data.chartOptMain.scales.x.min <= -2){
    moveLeftBtn.style.display = 'none'
      }
  }else{
    instance.data.chartOptMain.scales.x.min = -2;
    instance.data.chartOptMain.scales.x.max = step;
    moveLeftBtn.style.display = 'none'
    moveRightBtn.style.display = 'block'
  }
     instance.data.chart.update();
  }
  moveRightBtn.onclick = function () {

    let suma = instance.data.chartOptMain.scales.x.max+step; 
    if(suma <= orgMax){
        instance.data.chartOptMain.scales.x.min = instance.data.chartOptMain.scales.x.max;
        instance.data.chartOptMain.scales.x.max += step;
    }else{
      instance.data.chartOptMain.scales.x.min = orgMax-step;
      instance.data.chartOptMain.scales.x.max = orgMax+2;
      moveRightBtn.style.display = 'none'
    }
    
    if(instance.data.chartOptMain.scales.x.min == -2){
      moveLeftBtn.style.display = 'none'
    }else{
      moveLeftBtn.style.display = 'block'
    }
    instance.data.chart.update();
    }
}else{
  allChildren[1].style.top = `${((instance.data.chart.chartArea.bottom - instance.data.chart.chartArea.top)/2)-14+instance.data.chart.chartArea.top}px`; //`${mchart.height/2 - 20}px`;
}

}
}else if(instance.data.chartTypeMain == 'bubble' && instance.data.instanceContainerMain.clientWidth >= 478){
  instance.data.chartOptMain.layout.padding ={
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  }
  instance.data.chart.config._config.options.maintainAspectratio = true;
  instance.data.chart._aspectRatio = 1.4
  instance.data.chart.config._config.options.scales.x.min= -2;
instance.data.chart.config._config.options.scales.x.max= instance.data.maxYEARSBubble+2;
instance.data.instanceContainerMain.querySelectorAll('.moveBTN').forEach(e => e.remove());
instance.data.chart.resize();
instance.data.chart.update();
}

if(instance.data.chartTypeMain == 'line2'||instance.data.chartTypeMain == 'bar'||instance.data.chartTypeMain == 'groupedBar'){

document.getElementById(instance.data.selectDisplayMainIDLine2).style.right =`0px`;
document.getElementById(instance.data.selectDisplayIDLine2).style.right =`0px`;
document.getElementById(instance.data.selectDisplayMainIDLine2).style.left =`${properties.bubble.width()-90}px`;
document.getElementById(instance.data.selectDisplayIDLine2).style.left =`${properties.bubble.width()-90}px`;
instance.data.chart.update();
}

if(chartType == 'line2'){ 
  document.getElementById(instance.data.selectDisplayMainIDLine2).onclick = function () {
    selectDisplay.style.display = 'block';
   mchart.update();
  }
  document.getElementById(instance.data.selectDisplayIDLine2).onclick = function () {
    selectDisplay.style.display = 'none';
    if(selectDisplayMain.innerHTML == 'Quarter ˅'){
      selectDisplayMain.innerHTML = 'Year ˅';
      selectDisplay.innerHTML = 'Quarter';
      let lblYears = [];
      for(label in instance.data.parsedDatasetLabels){
        let data = instance.data.parsedDatasetLabels[label].substring(0,4);
        if(!lblYears.includes(data) && data != ' '){
          lblYears.push(data)
        }   
      };

      
     
      let currLabels = instance.data.parsedDatasetLabels;
      let datasetData = instance.data.parsedDataset1rNPVMain
      let newDataSet =[];
      let newDataSetLabels =[];
      let datasetData12 = instance.data.parsedDataset1rNPVMain
      let newDataSet12 =[];

    for(let j=0;j<lblYears.length;j++){
      let dataAmm = 0;
      let dataAmm2nd = 0;
      let dataAmm2 = 0;
      for(let i=0;i<datasetData.length;i++){
        let currLabel = currLabels[i];
        if(currLabel.includes(lblYears[j])){
          dataAmm += datasetData[i];
          dataAmm2nd += datasetData[i];
          dataAmm2 += datasetData12[i];
        }
      }
      newDataSetLabels.push(lblYears[j])
      newDataSet.push(dataAmm)
      newDataSet12.push(dataAmm2)
    }

    let currLabelse = instance.data.mainDateQuarters2e;
    let datahh = instance.data.line2DataSetOrg[0];

    let dinkleh = [];
    let dinklehCont = [];



    for(let a =0; a<datahh;a++){
      dinkleh = [];

      for(let j=0;j<lblYears.length;j++){
        let dataAmm = 0;
        for(let i=0;i<datahh.length;i++){
          let currLabel = currLabelse[i];
      
          if(currLabel.includes(lblYears[j])){
            dataAmm += datahh[i];
          
          }
        }
        dinkleh.push(dataAmm)
      }

      dinklehCont.push(dinkleh)
      chartData.datasets[0].data = dinklehCont[0];
    }
    
    let dataM = [];
    for(let i = 0; i<lblYears.length;i++){
      let dta = 0;
      for(let j = 0;j<chartData.datasets[0].data.length;j++){
        if(currLabelse[j].includes(lblYears[i])){
          dta += parseFloat(chartData.datasets[0].data[j]);
        }
      }
      dataM.push(dta);
    }
   
 

   chartData.datasets[0].data = dataM;

    chartData.labels = newDataSetLabels;
    newDataSet1ForTooltipr = dataM;
    yearorquarterhandler = 2;   
 
    mchart.update();
  
    }else{
    
      chartData.labels = instance.data.mainDateQuarters2e;
      for(let i = 0; i<instance.data.line2DataSetOrg.length;i++){
      chartData.datasets[i].data =instance.data.line2DataSetOrg[i];
      }
      yearorquarterhandler = 1;

      mchart.update();

      selectDisplayMain.innerHTML = 'Quarter ˅';
      selectDisplay.innerHTML = 'Year';
    }
    instance.data.yearorquarterhandler = yearorquarterhandler;
}


}

}
