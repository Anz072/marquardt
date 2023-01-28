function(instance, properties, context) {

	//=========================================================================id generator
	function makeid(length) {
	  var result = "";
	  var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	  var charactersLength = characters.length;
	  for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	  }
	  return result;
	}
	//=====================================================condition for charts to run only once
	if (instance.data.runOnce == false) {
	  function testfun() {
		console.log("WAS UPDATED by a function");
	  }
	  var parsedData = JSON.parse(properties.datajson);
	  var chartType = parsedData.type; //reData.type//properties.charttype;
	  var instanceCanvasId = makeid(15);
	  instance.data.instanceCanvasId = instanceCanvasId;
	  instance.canvas[0].id = instanceCanvasId;
	
	  var instanceContainer = document.getElementById(instanceCanvasId);
	  instance.data.instanceContainerisa =instanceContainer;
	  instance.data.instanceContainerMainID = instanceCanvasId;
	  var mainCanvas = document.createElement("CANVAS");
	  var mainCanvasID = instance.data.testIdvar;
	  mainCanvas.id = instance.data.testIdvar;
	  mainCanvas.style.width = "100%";
	  mainCanvas.style.height = "100%";
	  instance.canvas[0].appendChild(mainCanvas);
	
	  var chartData = {};
	  var chartOptions = {};
	  var chart = "";
	  var chartPlugin = [];
	  var money = "x";
	  var str = "xxxx";
	
	  var container = document.getElementById(mainCanvasID);
	
	  //===================================================================================Money sign
	  switch (properties.moneysign) {
		case "dollars":
		  money = "$";
		  break;
		case "euros":
		  money = "€";
		  break;
		case "pounds":
		  money = "£";
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
		  for (let j = 0; j < parsedData.data[0].costs.length; j++) {
			labelsDataHer2.push(parsedData.data[0].costs[j].date);
		  }
	
		  var colorsNewArrBlue2 = [];
		  for (let i = 0; i < parsedData.data.length; i++) {
			colorsNewArrBlue2.push(parsedData.data[i].color);
		  }
		  let datasetsGroupedmain = [];
		  let datasetsGrouped = {};
		  let datasetsGroupedmini = [];
		  for (let i = 0; i < parsedData.data.length; i++) {
			datasetsGroupedmini = [];
			for (let j = 0; j < parsedData.data[i].costs.length; j++) {
			  pushedMaxData.push(parsedData.data[i].costs[j].cost);
			  datasetsGroupedmini.push(parsedData.data[i].costs[j].cost);
			}
			datasetsGrouped = {
			  label: "Dataset 1",
			  data: datasetsGroupedmini,
			  backgroundColor: colorsNewArrBlue2[i],
			  borderColor: "#FFFFFF",
			};
			datasetsGroupedmain.push(datasetsGrouped);
		  }
	
		  //convert random dates to quarters
		  let fullYears = [];
		  let pushToOne = [];
	
		  for (let i = 0; i < labelsDataHer2.length; i++) {
			let data = labelsDataHer2[i].substring(0, 4);
			if (!fullYears.includes(data)) {
			  fullYears.push(data);
			}
		  }
		  for (let i = 0; i < fullYears.length; i++) {
			let dbzC = [];
			for (let j = 0; j < labelsDataHer2.length; j++) {
			  if (labelsDataHer2[j].includes(fullYears[i])) {
				let dbz = Date.parse(labelsDataHer2[i]);
				dbzC.push(dbz);
			  }
			}
			pushToOne.push(dbzC);
		  }
		  let datasetsGroupedoMain2 = [];
		  var mainDateQuarters2 = [];
		  let datasetsGroupedforMinMAX = [];
	
		  for (let a = 0; a < parsedData.data.length; a++) {
			let q1sum = 0;
			let q2sum = 0;
			let q3sum = 0;
			let q4sum = 0;
			mainDateQuarters2 = [];
			let datasetsGroupedminiO1 = [];
			let datasetsGroupedo2 = {};
			for (let i = 0; i < fullYears.length; i++) {
			  q1sum = 0;
			  q2sum = 0;
			  q3sum = 0;
			  q4sum = 0;
			  for (let e = 0; e < parsedData.data[a].costs.length; e++) {
				if (parsedData.data[a].costs[e].date.includes(fullYears[i])) {
				  let date2 = parsedData.data[a].costs[e].date;
				  let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
				  if (quarter == 1) {
					q1sum += parsedData.data[a].costs[e].cost;
				  } else if (quarter == 2) {
					q2sum += parsedData.data[a].costs[e].cost;
				  } else if (quarter == 3) {
					q3sum += parsedData.data[a].costs[e].cost;
				  } else if (quarter == 4) {
					q4sum += parsedData.data[a].costs[e].cost;
				  }
				}
			  }
			  let dt1 = fullYears[i] + " Q1";
			  let dt2 = fullYears[i] + " Q2";
			  let dt3 = fullYears[i] + " Q3";
			  let dt4 = fullYears[i] + " Q4";
	
			  mainDateQuarters2.push(dt1);
			  mainDateQuarters2.push(dt2);
			  mainDateQuarters2.push(dt3);
			  mainDateQuarters2.push(dt4);
			  datasetsGroupedminiO1.push(q1sum);
			  datasetsGroupedminiO1.push(q2sum);
			  datasetsGroupedminiO1.push(q3sum);
			  datasetsGroupedminiO1.push(q4sum);
	
			  datasetsGroupedforMinMAX.push(q1sum);
			  datasetsGroupedforMinMAX.push(q2sum);
			  datasetsGroupedforMinMAX.push(q3sum);
			  datasetsGroupedforMinMAX.push(q4sum);
			}
			datasetsGroupedo2 = {
			  label: parsedData.data[a].name,
			  data: datasetsGroupedminiO1,
			  backgroundColor: colorsNewArrBlue2[a],
			  borderColor: "#FFFFFF",
			};
			datasetsGroupedoMain2.push(datasetsGroupedo2);
		  }
	
		  chartData = {
			labels: mainDateQuarters2,
			datasets: datasetsGroupedoMain2,
		  };
	
		  var rounderValueG = 10;
	
		  //externalTooltipHandler2e
		  const getOrCreateTooltip2e = (chart) => {
			let tooltipEl = chart.canvas.parentNode.querySelector("div");
	
			if (!tooltipEl) {
			  tooltipEl = document.createElement("div");
			  tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
			  tooltipEl.style.borderRadius = "8px";
			  tooltipEl.style.color = "white";
			  tooltipEl.style.opacity = 1;
			  tooltipEl.style.pointerEvents = "none";
			  tooltipEl.style.position = "absolute";
			  tooltipEl.style.transform = "translate(-50%, 0)";
			  tooltipEl.style.transition = "all .1s ease";
	
			  const table = document.createElement("table");
			  table.style.margin = "0px";
	
			  tooltipEl.appendChild(table);
			  chart.canvas.parentNode.appendChild(tooltipEl);
			}
	
			return tooltipEl;
		  };
	
		  const externalTooltipHandler2e = (context) => {
			// Tooltip Element
			const { chart, tooltip } = context;
			const tooltipEl = getOrCreateTooltip2e(chart);
	
			// Hide if no tooltip
			if (tooltip.opacity === 0) {
			  tooltipEl.style.opacity = 0;
			  return;
			}
	
			// Set Text
			if (tooltip.body) {
			  const bodyLines = tooltip.body.map((b) => b.lines);
	
			  const tableBody = document.createElement("tbody");
			  bodyLines.forEach((body, i) => {
				//rows
				const tr = document.createElement("tr");
				tr.style.backgroundColor = "inherit";
				tr.style.borderWidth = 0;
				tr.style.whiteSpace = "nowrap";
				const tr0 = document.createElement("tr");
				tr0.style.backgroundColor = "inherit";
				tr0.style.borderWidth = 0;
				tr0.style.whiteSpace = "nowrap";
				//collumns
				const td = document.createElement("td");
				td.style.borderWidth = 0;
				td.style.width = "30%";
				td.style.fontSize = "12px";
				td.style.whiteSpace = "nowrap";
				td.style.padding = "3px";
				td.style.color = "#5B5B5B";
	
				const td0 = document.createElement("td");
				td0.style.borderWidth = 0;
				td0.style.width = "30px";
				td0.style.fontSize = "12px";
				td0.style.whiteSpace = "nowrap";
				td0.style.padding = "3px";
				td0.style.color = "#5B5B5B";
				//fonts
				td.style.fontFamily = "Poppins";
				td.style.fontWeight = "500";
				td0.style.fontFamily = "Poppins";
				td0.style.fontWeight = "600";
	
				var resE =
				  chart.tooltip.dataPoints[0].dataset.data[
					chart.tooltip.dataPoints[0].dataIndex
				  ]
					.toFixed(2)
					.replace(/[.,]00$/, "") +
				  " " +
				  parsedData.money;
	
				let iconDiv = document.createElement("div");
				iconDiv.style.height = "10px";
				iconDiv.style.width = "10px";
				iconDiv.style.display = "inline-block";
				iconDiv.style.borderRadius = "2px";
				iconDiv.style.backgroundColor =
				  chart.tooltip.labelColors[0].backgroundColor;
				//builder
				let text = document.createTextNode(" " + resE);
	
				let text0 = document.createTextNode(
				  chartData.datasets[chart.tooltip.dataPoints[0].datasetIndex].label
				);
				td.appendChild(iconDiv);
				td.appendChild(text);
				tr.appendChild(td);
				td0.appendChild(text0);
				tr0.appendChild(td0);
				tableBody.appendChild(tr0);
				tableBody.appendChild(tr);
			  });
	
			  const tableRoot = tooltipEl.querySelector("table");
			  tableRoot.style.backgroundColor = "#fff";
			  tableRoot.style.opacity = 1;
			  tableRoot.style.borderRadius = "10px";
			  tableRoot.style.border = "solid";
			  tableRoot.style.borderWidth = "0px";
			  tableRoot.style.borderColor = "#000";
	
			  // Remove old children
			  while (tableRoot.firstChild) {
				tableRoot.firstChild.remove();
			  }
	
			  // Add new children
	
			  tableRoot.appendChild(tableBody);
			}
	
			const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
	
			// Display, position, and set styles for font
			tooltipEl.style.opacity = 1;
			tooltipEl.style.backgroundColor = "#fff";
	
			tooltipEl.style.borderRadius = "8px";
			tooltipEl.style.border = "solid";
			tooltipEl.style.borderWidth = "0px";
			tooltipEl.style.borderColor = "#000";
			tooltipEl.style.boxShadow = "1px 1px 5px rgba(0, 0, 0, 0.45)";
			tooltipEl.style.font = tooltip.options.bodyFont.string;
			tooltipEl.style.padding = "8px";
			if (tooltipEl.clientHeight + tooltip.caretY < chart.height) {
			  tooltipEl.style.left = positionX + tooltip.caretX + "px";
			  tooltipEl.style.top = positionY + tooltip.caretY + "px";
			} else {
			  tooltipEl.style.left = positionX + tooltip.caretX + "px";
			  tooltipEl.style.top =
				positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
			}
		  };
		  //end
	
		  let minDataYgroupedbar = Math.round(
			Math.min(...datasetsGroupedforMinMAX)
		  );
		  let maxDataYgroupedbar = Math.round(
			Math.max(...datasetsGroupedforMinMAX)
		  );
		  let maxValueGroupedBar =
			Math.round(maxDataYgroupedbar / rounderValueG) * rounderValueG;
		  let minValueGroupedBar =
			Math.round(minDataYgroupedbar / rounderValueG) * rounderValueG;
	
		  var barData = chartData.datasets;
		  chartOptions = {
			maintainAspectRatio: false,
			layout: {
			  padding: {
				top: 45,
				left: 50,
				bottom: 10,
				right: 50,
			  },
			},
			barThickness: 16,
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
				color: "#2A2A2A",
				text: parsedData.title,
				padding: {
				  top: -30,
				  bottom: 0,
				},
				font: {
				  family: "Jost",
				  size: 18,
				  weight: "bold",
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  subtitle: {
				display: true,
				color: "#2A2A2A",
				text: parsedData.subtitle,
				padding: {
				  top: 5,
				  bottom: 10,
				},
				font: {
				  family: "Poppins",
				  size: 12,
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  tooltip: {
				enabled: false,
				position: "nearest",
				external: externalTooltipHandler2e,
			  },
			},
			scales: {
			  x: {
				min: 0,
				max: 20,
				grid: {
				  display: false,
				  drawBorder: false,
				  offset: true,
				},
				ticks: {
				  font: {
					size: 12,
				  },
				},
			  },
			  y: {
				suggestedMin: minValueGroupedBar,
				suggestedMax: maxValueGroupedBar,
				grid: {
				  display: true,
				  drawBorder: true,
				  borderDash: [2, 2],
				},
				ticks: {
				  font: {
					size: 12,
				  },
				  callback: function (value) {
					return value + " " + parsedData.money;
				  },
				},
			  },
			},
		  };
		  if (instanceContainer.clientWidth <= 478) {
			chartOptions.layout.padding = {
			  top: 35,
			  left: 5,
			  bottom: 5,
			  right: 5,
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
		  parsedData.data.forEach((e) => barData.push(e.rNPV));
	
		  let labelsHorizontal = [];
		  var barSum = barData.reduce((pV, cV) => pV + cV, 0);
		  let horizontalBarHolder = [];
		  let   wholeAmmount = 0;
		  for (let i = 0; i < parsedData.data.length; i++) {
			barData.push(parsedData.data[i].rNPV);
			labelsHorizontal.push(parsedData.data[i].label);
			wholeAmmount += parsedData.data[i].rNPV;
			let creation = {
			  label:
				parsedData.data[i].label + " rNPV"+" "+barData[i]+barData[i]+
				" " +
				((parsedData.data[i].rNPV * 100) / barSum)
				  .toFixed(2)
				  .replace(/[.,]00$/, "") +
				"%",
			  data: [parsedData.data[i].rNPV],
			  backgroundColor: parsedData.data[i].color,
			};
			horizontalBarHolder.push(creation);
		  }
	
		  chart = "bar";
	
		  chartData = {
			labels: ["Test"],
			datasets: horizontalBarHolder,
		  };
	
		  chartOptions = {
			maintainAspectRatio: false,
			layout: {
			  padding: {
				left: 10,
				right: 10,
				top: 1,
				bottom: 10,
			  },
			},
			barThickness: 20,
			indexAxis: "y",
			hover: {
			  animationDuration: 0,
			},
			scales: {
				x: {
					max: wholeAmmount,
					position: "center",
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
				// onClick: function (e) {},
				// position: "bottom",
				display: false,
				// labels: {
				//   padding: 20,
				//   boxWidth: 16,
				//   boxHeight: 16,
				//   //color: 'rgb(0,255,0)'
				// },
			  },
			  title: {
				display: true,
				color: "#2A2A2A",
				text: parsedData.title,
				padding: {
				  top: 10,
				  bottom: 0,
				},
				font: {
				  family: "Jost",
				  size: 18,
				  weight: "bold",
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  subtitle: {
				display: true,
				color: "#2A2A2A",
				text: parsedData.subtitle,
				padding: {
				  top: 5,
				  bottom: 0,
				},
				font: {
				  family: "Poppins",
				  size: 12,
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			},
		  };
	
		  const getOrCreateLegendList = (chart, id) => {
			const legendContainer = document.getElementById(instanceCanvasId);
	
			let listContainer = legendContainer.querySelector('ul');
			if (!listContainer) {
			  listContainer = document.createElement('ul');
			  listContainer.style.display = 'flex';
			  listContainer.style.flexDirection = 'row';
			  listContainer.style.gap = '10px';

        if(properties.bubble.width()< 600){
          listContainer.style.gap = '2px';

          }
			  listContainer.style.margin = 0;
			  listContainer.style.padding = 0;
			//   listContainer.style.marginTop = -20;
			  legendContainer.appendChild(listContainer);
			}
		  
			return listContainer;
		  };	
		  const getOrCreateLegendList2e = (chart, id) => {
			const legendContainer = document.getElementById(instanceCanvasId);
			let listContainer = legendContainer.querySelector('ul');
	
			if (!listContainer) {
			  listContainer = document.createElement('ul');
			  listContainer.style.display = 'flex';
			  listContainer.style.flexDirection = 'column';
			  listContainer.style.margin = 0;
			  listContainer.style.padding = 0;
			//   listContainer.style.marginTop = -20;
			  legendContainer.appendChild(listContainer);
			}
		  
			return listContainer;
		  };
	
		  const htmlLegendPlugin = {
				afterUpdate(chart, args, options) {
						const ul = getOrCreateLegendList(chart, options.containerID);
				  // Remove old legend items
				  while (ul.firstChild) {
					ul.firstChild.remove();
				  }
				  //Reuse the built-in legendItems generator
				  const items = chart.options.plugins.legend.labels.generateLabels(chart);
				  let table = document.createElement("table");
				  let sizeoflegend = 0;
				  items.forEach(item => {
					// if(properties.bubble.width() > 400){
						const li = document.createElement('li');
						li.style.alignItems = 'center';
						li.style.cursor = 'pointer';
						li.style.display = 'flex';
						li.style.flexDirection = 'row';
						li.style.marginLeft = '5px';
						li.style.backgroundColor = 'rgb(255,0,0)';
				
				  
						// Color box
						const boxSpan = document.createElement('span');
						boxSpan.style.background = item.fillStyle;
						boxSpan.style.borderColor = item.strokeStyle;
						boxSpan.style.borderWidth = item.lineWidth + 'px';
						boxSpan.style.display = 'inline-block';
						boxSpan.style.height = '12px';
						boxSpan.style.marginRight = '5px';
						boxSpan.style.minWidth = '12px';
						boxSpan.style.borderRadius = "3px";
            if(properties.bubble.width()< 600){
              boxSpan.style.marginTop = '-40px'
              }
						boxSpan.style.marginTop = '-43px'
						// Text datasetIndex
						const textContainer = document.createElement('p');
						textContainer.style.color = '#000';
						textContainer.style.margin = 0;
						textContainer.style.padding = 0;
						textContainer.style.marginTop = '-45px'
						const textContainerSpan = document.createElement('span');
						textContainerSpan.style.color = '#000';
						textContainerSpan.style.fontWeight = '600';
						textContainerSpan.style.fontFamily = "Poppins";
						textContainerSpan.style.fontSize = "14px";
            if(properties.bubble.width()< 600){
              textContainerSpan.style.fontSize = "11px";
              }
						const textContainerSpan2 = document.createElement('span');
						textContainerSpan2.style.color = '#5B5B5B';
						textContainerSpan2.style.fontWeight = '500';
						textContainerSpan2.style.fontFamily = "Poppins";
     
						textContainerSpan2.style.fontSize = "14px";
            if(properties.bubble.width()< 600){
              textContainerSpan2.style.fontSize = "11px";
              }
						const textContainerSpan3 = document.createElement('span');
						textContainerSpan3.style.color = '#000';
						textContainerSpan3.style.fontWeight = '600';
						textContainerSpan3.style.fontFamily = "Poppins";
						textContainerSpan3.style.fontSize = "14px";
            if(properties.bubble.width()< 600){
              textContainerSpan3.style.fontSize = "11px";
              }
						const textContainerSpan4 = document.createElement('span');
						textContainerSpan4.style.color = '#000';
						textContainerSpan4.style.fontWeight = '600';
						textContainerSpan4.style.fontFamily = "Jost";
						textContainerSpan4.style.fontSize = "14px";
            if(properties.bubble.width()< 600){
              textContainerSpan4.style.fontSize = "11px";
              }
						// textContainer.style.textDecoration = item.hidden ? 'line-through' : '';   barData[i]
						const text = document.createTextNode(' rNPV');
						const text2 = document.createTextNode(parsedData.data[item.datasetIndex].label);
						const text3 = document.createTextNode(" "+barData[item.datasetIndex] + parsedData.money);
						const text4 = document.createTextNode(" " +
						((parsedData.data[item.datasetIndex].rNPV * 100) / barSum)
						  .toFixed(2)
						  .replace(/[.,]00$/, "") +
						"%");
					
						textContainerSpan.appendChild(text);
						textContainerSpan2.appendChild(text2);
						textContainerSpan3.appendChild(text3);
						textContainerSpan4.appendChild(text4);
	
						textContainer.appendChild(textContainerSpan2);
            if(parsedData.mode == undefined || parsedData.mode != "noRNPV"){
              textContainer.appendChild(textContainerSpan);
              textContainer.appendChild(textContainerSpan3);
            }
						textContainer.appendChild(textContainerSpan4);
						
						li.appendChild(boxSpan);
						li.appendChild(textContainer);
						ul.appendChild(li);
				
				  });
				  table.style.marginTop = `-${sizeoflegend}px`; 
				  document.getElementById(instanceCanvasId).appendChild(table)

				}
			};

		  chartPlugin = [htmlLegendPlugin]
		  break;
		case "line":
		  chart = "line";
	
		  let parsedDatasetNPV = [];
		  let parsedDatasetLabelsLine = [];
	
		  for (let i = 0; i < parsedData.data.length; i++) {
			parsedDatasetNPV.push(parsedData.data[i].revenue);
			parsedDatasetLabelsLine.push(parsedData.data[i].date);
		  }
		  instance.data.parsedMoneyValue = parsedData.money;
	
		  var maxVal = Math.max(...parsedDatasetNPV);
		  var maxValLength = maxVal.toString().length;
		  var valIdentificator = "";
	
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
				bottom: 16,
				right: 36,
			  },
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
					return value + " " + instance.data.parsedMoneyValue;
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
					return (
					  context.parsed.y + instance.data.parsedMoneyValue
					);
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
			let valArr = [];
			let valArrMax = [];
			for (let i = parsedData.data[0].length - 1; i >= 0; i--) {
			  let val = parsedData.data[0][i];
			  if (!valArr.includes(val.date)) {
				valArr.push(val.date);
				valArrMax.push(val);
			  }
			}
			if(parsedData.mode == "latest"){
		
			//find all duplicates in array
			let valArr2a = [];
			let valArr2aMax = [];
			let tt12312 = false;
			for (let i = 0; i < parsedData.data[0].length; i++) {
			  for (let j = i + 1; j < parsedData.data[0].length; j++) {
				if (parsedData.data[0][i].date == parsedData.data[0][j].date) {
				  valArr2aMax.push(i);
				  let ez = new Date(parsedData.data[0][i].created).getTime();
				  let ze = new Date(parsedData.data[0][j].created).getTime();
				  if (ez < ze) {
					valArr2a.push(i);
				  } else {
					valArr2a.push(j);
				  }
				}
			  }
			}
		  
			let valArr2aUNIQUE = [...new Set(valArr2a)];
			for (let i = 0; i < valArr2aUNIQUE.length; i++) {
			  parsedData.data[0][valArr2aUNIQUE[i]] = "";
			}
		  
			for (let i = parsedData.data[0].length; i > 0; i--) {
			  let val = parsedData.data[0][i];
			}
			const parsedDataRemovedEmpt = parsedData.data[0].filter((str) => str !== '');
			
			parsedData.data[0] = parsedDataRemovedEmpt;
			}
			parsedData.data[0].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // b - a for reverse sort
	
	
	
	
			
			var maxVal;
			var parsedDataset1NPV = [];
			var parsedDataset1rNPV = [];
			var parsedDatasetLabels = [];
			var parsedDataset1NPVMain = [];
			var parsedDataset1rNPVMain = [];
			for (let i = 0; i < parsedData.data.length; i++) {
			  parsedDataset1NPV = [];
			  parsedDataset1rNPV = [];
			  parsedDatasetLabels = [];
			  for (let j = 0; j < parsedData.data[i].length; j++) {
				parsedDataset1NPV.push(parsedData.data[i][j].NPV);
				parsedDataset1rNPV.push(parsedData.data[i][j].rNPV);
				parsedDatasetLabels.push(parsedData.data[i][j].date);
			  }
			  parsedDataset1NPVMain.push(parsedDataset1NPV);
			  instance.data.parsedDataset1rNPVMain.push(parsedDataset1rNPV);
			}



			parsedDataset1rNPVMain = instance.data.parsedDataset1rNPVMain;
			instance.data.parsedDatasetLabels = parsedDatasetLabels;
	  
			var mainDateQuarters2e = [];
			let fullYears2 = [];
			for (let i = 0; i < parsedDatasetLabels.length; i++) {
			  let data = parsedDatasetLabels[i].substring(0, 4);
			  if (!fullYears2.includes(data)) {
				fullYears2.push(data);
			  }
			}
	
	
			let datasetsGroupedo2NPV = [];
			var datasetsGroupedoMain2e = [];
			let borderColorArr = ["#F59F26", "rgba(13, 105, 134, 1)"];
			for (let a = 0; a < parsedDataset1rNPVMain.length; a++) {
			  mainDateQuarters2e = [];
			  let datasetsGroupedminiO1 = [];
			  let datasetsGroupedminiO1NPV = [];
			  let datasetsGroupedo2 = {};
	
			  for (let i = 0; i < fullYears2.length; i++) {
				let q1sum = 0;
				let q2sum = 0;
				let q3sum = 0;
				let q4sum = 0;
				let q1sumNPV = 0;
				let q2sumNPV = 0;
				let q3sumNPV = 0;
				let q4sumNPV = 0;
				datasetsGroupedo2 = {};
				for (let e = 0; e < parsedData.data[a].length; e++) {
				  if (parsedData.data[a][e].date.includes(fullYears2[i])) {
	
					let date2 = parsedData.data[a][e].date;
					let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
					if (quarter == 1) {
					  q1sumNPV += parsedData.data[a][e].NPV;
					  q1sum += parsedData.data[a][e].rNPV;
					} else if (quarter == 2) {
					  q2sumNPV += parsedData.data[a][e].NPV;
					  q2sum += parsedData.data[a][e].rNPV;
					} else if (quarter == 3) {
					  q3sumNPV += parsedData.data[a][e].NPV;
					  q3sum += parsedData.data[a][e].rNPV;
					} else if (quarter == 4) {
					  q4sumNPV += parsedData.data[a][e].NPV;
					  q4sum += parsedData.data[a][e].rNPV;
					}
				  }
				}
				let dt1 = fullYears2[i] + " Q1";
				let dt2 = fullYears2[i] + " Q2";
				let dt3 = fullYears2[i] + " Q3";
				let dt4 = fullYears2[i] + " Q4";
	  
				if (q1sumNPV !== 0) {
				  mainDateQuarters2e.push(dt1);
				  datasetsGroupedminiO1NPV.push(q1sumNPV);
				  datasetsGroupedminiO1.push(q1sum);
				}
				if (q2sumNPV !== 0) {
				  mainDateQuarters2e.push(dt2);
				  datasetsGroupedminiO1NPV.push(q2sumNPV);
				  datasetsGroupedminiO1.push(q2sum);
	
				}
				if (q3sumNPV !== 0) {
				  mainDateQuarters2e.push(dt3);
				  datasetsGroupedminiO1NPV.push(q3sumNPV);
				  datasetsGroupedminiO1.push(q3sum);
				}
				if (q4sumNPV !== 0) {
				  mainDateQuarters2e.push(dt4);
				  datasetsGroupedminiO1NPV.push(q4sumNPV);
				  datasetsGroupedminiO1.push(q4sum);
				}
	
			  }
	  
			  datasetsGroupedo2 = {
				data: datasetsGroupedminiO1,
				fill: false,
				borderColor: borderColorArr[a],
				backgroundColor: "rgba(255, 255, 255, 1)",
				stepped: false,
				tension: 0.2,
				radius: 4,
				borderWidth: 3.5,
			  };
			  datasetsGroupedoMain2e.push(datasetsGroupedo2);
			  datasetsGroupedo2NPV.push(datasetsGroupedminiO1NPV);
			}
			maxVal = Math.max(...parsedDataset1rNPV);
	  
	
			let fullYears2mag = [];
			for (let i = 0; i < parsedData.data[0].length; i++) {
			  let data = parsedData.data[0][i].date.substring(0, 4);
			  if (!fullYears2mag.includes(data)) {
				fullYears2mag.push(data);
			  }
			}
		
			let latestQuarterValue = 0;
		
			let YearsE = [];
			for (let a = 0; a < fullYears2mag.length; a++) {
			  let latestQ1 = [];
			  let latestQ2 = [];
			  let latestQ3 = [];
			  let latestQ4 = [];
			  for (let i = 0; i < parsedData.data[0].length; i++) {
				let date2 = parsedData.data[0][i].date;
				let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
				if (date2.includes(fullYears2mag[a])) {
				  let labelp1 = parsedData.data[0][i].date.substring(0, 4);
				  let labelp2 = "NA";
				  let label = "NA";
				  if (quarter == 1) {
					labelp2 = "Q1";
					latestQ1.push(parsedData.data[0][i]);
				  } else if (quarter == 2) {
					labelp2 = "Q2";
					latestQ2.push(parsedData.data[0][i]);
				  } else if (quarter == 3) {
					labelp2 = "Q3";
					latestQ3.push(parsedData.data[0][i]);
				  } else if (quarter == 4) {
					labelp2 = "Q4";
					latestQ4.push(parsedData.data[0][i]);
				  }
				}
			  }
			  YearsE.push(latestQ1);
			  YearsE.push(latestQ2);
			  YearsE.push(latestQ3);
			  YearsE.push(latestQ4);
			}
		
			let magicLabels = [];
			let magicValues = [];
			for (let a = 0; a < YearsE.length; a++) {
			  let lastElement = YearsE[a].pop();
			  if (lastElement == undefined) {
				continue;
			  }
			  let date1 = lastElement.date.substring(0, 4);
			  let date2 = lastElement.date;
			  let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
			  let value = lastElement.rNPV;
			  magicLabels.push(date1 + " Q" + quarter);
			  magicValues.push(value);
			}

			
			if(parsedData.mode == "pipeline"){
				let yearsPipe = [];
				let dataPipe = [];
					for (let i = 0; i < parsedData.data[0].length; i++) {
						dataPipe.push(parsedData.data[0][i].rNPV)
					  let date2 = parsedData.data[0][i].date;
					  let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
						let labelp1 = parsedData.data[0][i].date.substring(0, 4);
						if (quarter == 1) {
						  labelp2 = "Q1";
						  yearsPipe.push(labelp1 + " " + labelp2)
						} else if (quarter == 2) {
						  labelp2 = "Q2";
						  yearsPipe.push(labelp1 + " " + labelp2)
						} else if (quarter == 3) {
						  labelp2 = "Q3";
						  yearsPipe.push(labelp1 + " " + labelp2)
						} else if (quarter == 4) {
						  labelp2 = "Q4";
						  yearsPipe.push(labelp1 + " " + labelp2)
						}
					}
					mainDateQuarters2e = yearsPipe;
					datasetsGroupedoMain2e[0].data = dataPipe;
			}

		
	
			if(parsedData.mode == "latest" ){
			  mainDateQuarters2e = magicLabels;
			  datasetsGroupedoMain2e[0].data = magicValues;
			}
		
			chartData = {
			  labels: mainDateQuarters2e,
			  datasets: datasetsGroupedoMain2e,
			};
			instance.data.mainDateQuarters2e = mainDateQuarters2e;
			var line2DataSetOrg = [];
			for (let i = 0; i < datasetsGroupedoMain2e.length; i++) {
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
			  let tooltipEl = chart.canvas.parentNode.querySelector("div");
	  
			  if (!tooltipEl) {
				tooltipEl = document.createElement("div");
				chart.canvas.parentNode.appendChild(tooltipEl);
	  
				tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
				tooltipEl.style.borderRadius = "8px";
				tooltipEl.style.color = "white";
				tooltipEl.style.opacity = 1;
				tooltipEl.style.position = "absolute";
				tooltipEl.style.transform = "translate(-50%, 0)";
				tooltipEl.style.transition = "all .1s ease";
	  
				const table = document.createElement("table");
				table.style.margin = "0px";
	  
				tooltipEl.appendChild(table);
			  }
	  
			  return tooltipEl;
			};
	  
			var npvMain = [];
			var rnpvMain = [];
			var newDataSet1ForTooltip = [];
			var newDataSet2ForTooltip = [];
			var newDataSet1ForTooltipr = [];
			var newDataSet2ForTooltipr = [];
			const externalTooltipHandler = (context) => {
			  // Tooltip Element
			  var extTimer = 1;
			  const { chart, tooltip } = context;
			  const tooltipEl = getOrCreateTooltip(chart);
	  
			  // Set Text
			  if (tooltip.body) {
				testInstance = 0;
				const bodyLines = tooltip.body.map((b) => b.lines);
	  
				const tableBody = document.createElement("tbody");
				bodyLines.forEach((body, i) => {
				  //rows
				  const tr0 = document.createElement("tr");
				  tr0.style.backgroundColor = "inherit";
				  tr0.style.borderWidth = 0;
				  tr0.style.whiteSpace = "nowrap";
	  
				  const tr = document.createElement("tr");
				  tr.style.backgroundColor = "inherit";
				  tr.style.borderWidth = 0;
				  tr.style.whiteSpace = "nowrap";
	  
				  const tr2 = document.createElement("tr");
				  tr2.style.backgroundColor = "inherit";
				  tr2.style.borderWidth = 0;
				  tr2.style.whiteSpace = "nowrap";
	  
				  const tr3 = document.createElement("tr");
				  tr3.style.backgroundColor = "inherit";
				  tr3.style.borderWidth = 0;
				  tr3.style.whiteSpace = "nowrap";
				  //collumns
				  const td0 = document.createElement("td");
				  td0.style.borderWidth = 0;
				  td0.style.color = "#000";
				  td0.style.whiteSpace = "nowrap";
				  td0.style.fontSize = "12px";
				  td0.style.paddingBottom = "3px";
				  const td = document.createElement("td");
				  td.style.borderWidth = 0;
				  td.style.color = "#000";
				  td.style.whiteSpace = "nowrap";
				  td.style.fontSize = "12px";
				  td.style.paddingBottom = "3px";
	  
				  const td2 = document.createElement("td");
				  td2.style.borderWidth = 0;
				  td2.style.color = "#000";
				  td2.style.whiteSpace = "nowrap";
				  td2.style.fontSize = "12px";
				  td2.style.paddingBottom = "3px";
				  const td3 = document.createElement("td");
				  td3.style.borderWidth = 0;
				  td3.style.color = "#000";
				  td3.style.whiteSpace = "nowrap";
				  td3.style.fontSize = "12px";
				  td3.style.paddingBottom = "3px";
				  td3.style.paddingLeft = "8px";
				  td.style.paddingLeft = "8px";
	  
				  const tdbtn = document.createElement("button");
				  tdbtn.onclick = function () {
					console.log("IT WAS CLICKED");
				  };
				  tdbtn.style.position = "relative";
				  tdbtn.style.marginTop = "4px";
				  tdbtn.style.borderWidth = "1px";
				  tdbtn.style.border = "solid";
				  tdbtn.style.borderColor = "#F59F26";
				  tdbtn.style.borderRadius = "5px";
	  
				  tdbtn.style.width = "100%";
				  tdbtn.style.height = "40px";
				  tdbtn.style.fontSize = "12px";
				  tdbtn.style.whiteSpace = "nowrap";
				  tdbtn.style.padding = "3px";
	  
				  var tdbtnvert = document.createElement("div");
				  tdbtnvert.style.margin = "0";
				  tdbtnvert.style.position = "absolute";
				  tdbtnvert.style.top = "50%";
				  tdbtnvert.style.transform = "translateY(-50%)";
				  tdbtn.style.display = "block";
				  tdbtn.style.fontFamily = "Jost";
				  tdbtn.style.fontWeight = "600";
				  tdbtn.style.fontSize = "16px";
				  tdbtn.style.verticalAlign = "bottom";
				  tdbtn.style.backgroundColor = "#fff";
				  tdbtnvert.style.left = "50%";
				  tdbtnvert.style.top = "50%";
				  tdbtnvert.style.transform = "translate(-50%, -50%)";
				  tdbtnvert.style.backgroundColor = "#fff";
				  testInstance++;
	  
				  //fonts
				  td0.style.fontFamily = "Poppins";
				  td.style.fontFamily = "Poppins";
				  td2.style.fontFamily = "Poppins";
				  td3.style.fontFamily = "Poppins";
				  td0.style.fontWeight = "600";
				  td2.style.fontWeight = "600";
				  td.style.fontWeight = "500";
				  td3.style.fontWeight = "500";
	  
				  var resE = 0;
				  npvMain = [];
				  rnpvMain = [];
				  if (testInstance == 2) {
					chart.tooltip.dataPoints[0].datasetIndex = 1;
				  }
	  
				  if (yearorquarterhandler != 2) {
					if (chart.tooltip.dataPoints[0].datasetIndex == 0) {
					  rnpvMain = datasetsGroupedoMain2e[0].data;
					  npvMain = datasetsGroupedoMain2e[0].data;
					} else {
					  npvMain = datasetsGroupedoMain2e[0].data;
					  rnpvMain = datasetsGroupedoMain2e[1].data;
					}
				  } else {
	  
					if (chart.tooltip.dataPoints[0].datasetIndex == 0) {
					  npvMain = newDataSet1ForTooltip;
					  rnpvMain = newDataSet1ForTooltipr;
					} else {
					  npvMain = newDataSet2ForTooltip;
					  rnpvMain = newDataSet2ForTooltipr;
					}
				  }
				  resE =
					rnpvMain[chart.tooltip.dataPoints[0].dataIndex]
					  .toFixed(2)
					  .replace(/[.,]00$/, "") + parsedData.money;
	  
				  let res = "";
				  let resTemp = 0;
				  if (chart.tooltip.dataPoints[0].dataIndex >= 1) {
					resTemp =
					  rnpvMain[chart.tooltip.dataPoints[0].dataIndex] -
					  rnpvMain[chart.tooltip.dataPoints[0].dataIndex - 1];
					res = (
					  rnpvMain[chart.tooltip.dataPoints[0].dataIndex] -
					  rnpvMain[chart.tooltip.dataPoints[0].dataIndex - 1]
					)
					  .toFixed(2)
					  .replace(/[.,]00$/, "");
				  } else {
					resTemp = rnpvMain[chart.tooltip.dataPoints[0].dataIndex]
					  .toFixed(2)
					  .replace(/[.,]00$/, "");
					res = resTemp;
				  }
	  
				  resTemp = res;
	  
				  let resF = "";
				  if (chart.tooltip.dataPoints[0].dataIndex == 0) {
					resF = "0";
				  } else {
					if (resTemp > 0) {
					  td3.style.color = "#71B560";
					  resF = "↗ " + res;
					} else {
					  td3.style.color = "#e04f4f";
					  resF = "↙ " + res;
					}
				  }
	  
				  let iconDiv = document.createElement("div");
				  iconDiv.style.height = "10px";
				  iconDiv.style.width = "10px";
				  iconDiv.style.display = "inline-block";
				  iconDiv.style.borderRadius = "2px";
				  iconDiv.style.backgroundColor =
					chart.tooltip.labelColors[0].borderColor;
				  if (testInstance == 2) {
					iconDiv.style.backgroundColor =
					  chart.tooltip.labelColors[1].borderColor;
					tdbtn.style.display = "none";
	  
					chart.tooltip.dataPoints[0].datasetIndex = 0;
					testInstance = 0;
				  }
	  
				  //builder
				  const text0 = document.createTextNode("rNPV");
				  const text = document.createTextNode(" " + resE);
				  const text2 = document.createTextNode("rNPV△");
				  const text3 = document.createTextNode(resF + parsedData.money);
				  
				  td0.style.textAlign = "left"
				  td.style.textAlign = "right"
				  td2.style.textAlign = "left"
				  td3.style.textAlign = "right"
				 
				 
				 
				  td0.appendChild(text0);
				  td.appendChild(iconDiv);
				  td.appendChild(text);
	  
				  td2.appendChild(text2);
				  td3.appendChild(text3);
	  
				  tr0.appendChild(td0);
				  tr0.appendChild(td);
				  tr2.appendChild(td2);
				  tr2.appendChild(td3);
				  let text22 = document.createTextNode("View Inputs  →"); //"View Inputs  →"
				  tdbtn.appendChild(tdbtnvert);
				  tdbtnvert.appendChild(text22);
				  if (chartData.datasets.length > 1) {
					if (
					  chartData.datasets[0].data[
						chart.tooltip.dataPoints[0].dataIndex
					  ] ==
					  chartData.datasets[1].data[
						chart.tooltip.dataPoints[0].dataIndex
					  ]
					) {
					  tdbtn.style.display = "none";
					}
				  }
	  
				  tableBody.appendChild(tr0);
				  tableBody.appendChild(tr);
				  tableBody.appendChild(tr2);
				  tableBody.appendChild(tr3);
				  if (parsedData.data.length == 2) {
					tableBody.appendChild(tdbtn);
				  }
				});
	  
				const tableRoot = tooltipEl.querySelector("table");
				tableRoot.style.backgroundColor = "#fff";
				tableRoot.style.opacity = 1;
				tableRoot.style.borderRadius = "2px";
				tableRoot.style.border = "solid";
				tableRoot.style.borderWidth = "0px";
				tableRoot.style.borderColor = "#000";
	  
				// Remove old children
				while (tableRoot.firstChild) {
				  tableRoot.firstChild.remove();
				}
	  
				// Add new children
	  
				tableRoot.appendChild(tableBody);
			  }
	  
			  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
	  
			  // Display, position, and set styles for font
			  tooltipEl.style.opacity = 1;
			  tooltipEl.style.display = "block";
			  tooltipEl.style.backgroundColor = "#fff";
			  tooltipEl.style.borderRadius = "8px";
			  tooltipEl.style.border = "solid";
			  tooltipEl.style.borderWidth = "0px";
			  tooltipEl.style.borderColor = "#000";
			  tooltipEl.style.boxShadow = "1px 1px 5px black";
			  tooltipEl.style.font = tooltip.options.bodyFont.string;
			  tooltipEl.style.padding = "8px";
			  var extJAYCY = 0;
			  var extJAYCYent = 0;
			  tooltipEl.addEventListener("mouseover", (e) => {
				testInstance = 0;
	  
				extJAYCYent = 1;
				if (extJAYCY != 2) {
				  tooltipEl.style.display = "block";
				  tooltipEl.style.opacity = 1;
				}
			  });
			  // Hide if no tooltip
			  if (tooltip.opacity === 0) {
				setTimeout(function () {
				  if (extJAYCYent == 0) {
					tooltipEl.style.display = "none";
				  }
				}, 200);
				return;
			  }
	  
			  tooltipEl.addEventListener("mouseleave", (e) => {
				testInstance = 0;
	  
				tooltipEl.style.display = "none";
				tooltipEl.style.opacity = 0;
				extJAYCY = 2;
			  });
	  
			  if (tooltipEl.clientHeight + tooltip.caretY + 6 < chart.height) {
				if (parsedData.data.length == 1) {
				  tooltipEl.style.left = positionX + tooltip.caretX + 45 + "px";
				  tooltipEl.style.top = positionY + tooltip.caretY + 4 + "px";
				} else {
				  tooltipEl.style.left = positionX + tooltip.caretX + 70 + "px";
				  tooltipEl.style.top = positionY + tooltip.caretY + 6 + "px";
				}
			  } else {
				tooltipEl.style.left = positionX + tooltip.caretX + 40 + "px";
				tooltipEl.style.top =
				  positionY + tooltip.caretY - tooltipEl.clientHeight - 2 + "px";
			  }
			  if (tooltipEl.clientWidth > tooltip.caretX) {
				tooltipEl.style.left =
				  tooltip.caretX + tooltipEl.clientWidth / 2 + "px";
			  }
			  if (chart.width < tooltip.caretX + tooltipEl.clientWidth) {
				tooltipEl.clientWidth = "136px";
				tooltipEl.style.left =
				  tooltip.caretX - tooltipEl.clientWidth / 1.8 + "px";
			  }
			};
			//end first HANDLER
			let txtForLabel1 = "Asset Value " + parsedData.money;
	  
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
			if (parsedData.data.length == 2) {
			  switchLegendLine2 = true;
			}
			chartOptions = {
			  maintainAspectRatio: false,
			  responsive: true,
			  layout: {
				padding: {
				  top: 10,
				  left: 16,
				  bottom: 16,
				  right: 40,
				},
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
				  beginAtZero: true,
				  title: {
					display: true,
					text: txtForLabel1,
					color: "#2A2A2A",
					align: "center",
					font: {
					  size: 13,
					  family: "Poppins",
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
					usePointStyle: true,
					pointStyle: "rectRounded",
					padding: 20,
					boxWidth: 16,
					boxHeight: 16,
				  },
				},
				tooltip: {
				  enabled: false,
				  position: "nearest",
				  external: externalTooltipHandler,
				},
				title: {
				  display: true,
				  color: "#2A2A2A",
				  text: parsedData.title,
				  padding: {
					top: 10,
					bottom: 30,
				  },
				  font: {
					size: 18,
					weight: "bold",
					family: "Jost",
					lineHeight: 1.2,
				  },
				  align: "start",
				},
			  },
			};
	  
			break;
		case "bar":
		  chart = "bar";
	
		  var dataBarExtracted = [];
		  var dataBarExtractedMinus = [];
		  var dataBarExtractedPlus = [];
		  var labelsBarExtracted = [];
		  if (parsedData.data[0].licensing_type == "In-licensing") {
			for (let i = 0; i < parsedData.data[0].milestones.length; i++) {
			  dataBarExtracted.push(
				parsedData.data[1].milestones[i].in_licensing_costs
			  );
			  dataBarExtractedMinus.push(
				parsedData.data[0].milestones[i].in_licensing_costs
			  );
			  dataBarExtractedPlus.push(
				parsedData.data[2].milestones[i].in_licensing_costs
			  );
			  labelsBarExtracted.push(parsedData.data[1].milestones[i].date);
			}
		  } else if (parsedData.data[0].licensing_type == "Out-Licensing") {
			for (let i = 0; i < parsedData.data.milestones.length; i++) {
			  dataBarExtracted.push(
				parsedData.data[1].milestones[i].out_licensing_costs
			  );
			  dataBarExtractedMinus.push(
				parsedData.data[0].milestones[i].out_licensing_costs
			  );
			  dataBarExtractedPlus.push(
				parsedData.data[2].milestones[i].out_licensing_costs
			  );
			  labelsBarExtracted.push(parsedData.data[1].milestones[i].date);
			}
		  } else if (
			parsedData.data[0].licensing_type == "In-licensing&Out-Licensing"
		  ) {
			for (let i = 0; i < parsedData.data.milestones.length; i++) {
			  let data =
				parsedData.data[1].milestones[i].out_licensing_costs +
				parsedData.data[1].milestones[i].in_licensing_costs;
			  let dataMinus =
				parsedData.data[0].milestones[i].out_licensing_costs +
				parsedData.data[0].milestones[i].in_licensing_costs;
			  let dataPlus =
				parsedData.data[2].milestones[i].out_licensing_costs +
				parsedData.data[2].milestones[i].in_licensing_costs;
			  dataBarExtracted.push(data);
			  dataBarExtractedMinus.push(dataMinus);
			  dataBarExtractedPlus.push(dataPlus);
			  labelsBarExtracted.push(parsedData.data[1].milestones[i].date);
			}
		  } else {
		  }
	
		  var step = 5;
		  container = document.getElementById(mainCanvasID);
		  var entered_barData = dataBarExtracted;
		  var barData = entered_barData;
		  let lblBAR = labelsBarExtracted;
		  var valIdentificator = "";
		  var line2step = 10;
		  var rounderValue = 10;
		  let fullYearsBar = [];
		  for (let i = 0; i < labelsBarExtracted.length; i++) {
			let data = labelsBarExtracted[i].substring(0, 4);
			if (!fullYearsBar.includes(data)) {
			  fullYearsBar.push(data);
			}
		  }
		  //turning dates into quarters
		  var mainDateQuarters2es = [];
		  let datasetsGroupedminiO2 = [];
		  var datasetsGroupedminiO2Minus = [];
		  var datasetsGroupedminiO2Plus = [];
		  for (let i = 0; i < fullYearsBar.length; i++) {
			let q1sum = 0;
			let q2sum = 0;
			let q3sum = 0;
			let q4sum = 0;
	
			let q1sumMinus = 0;
			let q2sumMinus = 0;
			let q3sumMinus = 0;
			let q4sumMinus = 0;
	
			let q1sumPlus = 0;
			let q2sumPlus = 0;
			let q3sumPlus = 0;
			let q4sumPlus = 0;
	
			for (let e = 0; e < labelsBarExtracted.length; e++) {
			  if (labelsBarExtracted[e].includes(fullYearsBar[i])) {
				let date2 = labelsBarExtracted[e];
				let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
	
				if (quarter == 1) {
				  q1sum += dataBarExtracted[e];
				  q1sumMinus += dataBarExtractedMinus[e];
				  q1sumPlus += dataBarExtractedPlus[e];
				} else if (quarter == 2) {
				  q2sum += dataBarExtracted[e];
				  q2sumMinus += dataBarExtractedMinus[e];
				  q2sumPlus += dataBarExtractedPlus[e];
				} else if (quarter == 3) {
				  q3sum += dataBarExtracted[e];
				  q3sumMinus += dataBarExtractedMinus[e];
				  q3sumPlus += dataBarExtractedPlus[e];
				} else if (quarter == 4) {
				  q4sum += dataBarExtracted[e];
				  q4sumMinus += dataBarExtractedMinus[e];
				  q4sumPlus += dataBarExtractedPlus[e];
				}
			  }
			}
			let dt1 = fullYearsBar[i] + " Q1";
			let dt2 = fullYearsBar[i] + " Q2";
			let dt3 = fullYearsBar[i] + " Q3";
			let dt4 = fullYearsBar[i] + " Q4";
	
			mainDateQuarters2es.push(dt1);
			mainDateQuarters2es.push(dt2);
			mainDateQuarters2es.push(dt3);
			mainDateQuarters2es.push(dt4);
	
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
		  let maxValueBar = Math.round(maxDataYbar / rounderValue) * rounderValue;
		  //end of dates -> quarters
	
		  //externalTooltipHandler2
		  const getOrCreateTooltip2 = (chart) => {
			let tooltipEl = chart.canvas.parentNode.querySelector("div");
	
			if (!tooltipEl) {
			  tooltipEl = document.createElement("div");
			  tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
			  tooltipEl.style.borderRadius = "8px";
			  tooltipEl.style.color = "white";
			  tooltipEl.style.opacity = 1;
			  tooltipEl.style.pointerEvents = "none";
			  tooltipEl.style.position = "absolute";
			  tooltipEl.style.transform = "translate(-50%, 0)";
			  tooltipEl.style.transition = "all .1s ease";
	
			  const table = document.createElement("table");
			  table.style.margin = "0px";
	
			  tooltipEl.appendChild(table);
			  chart.canvas.parentNode.appendChild(tooltipEl);
			}
	
			return tooltipEl;
		  };
	
		  const externalTooltipHandler2 = (context) => {
			// Tooltip Element
			const { chart, tooltip } = context;
			const tooltipEl = getOrCreateTooltip2(chart);
	
			// Hide if no tooltip
			if (tooltip.opacity === 0) {
			  tooltipEl.style.opacity = 0;
			  return;
			}
	
			// Set Text
			if (tooltip.body) {
			  const bodyLines = tooltip.body.map((b) => b.lines);
	
			  const tableBody = document.createElement("tbody");
			  bodyLines.forEach((body, i) => {
				//rows
				const tr = document.createElement("tr");
				tr.style.backgroundColor = "inherit";
				tr.style.borderWidth = 0;
				tr.style.whiteSpace = "nowrap";
				//collumns
				const td = document.createElement("td");
				td.style.borderWidth = 0;
				td.style.width = "30px";
				td.style.fontSize = "12px";
				td.style.whiteSpace = "nowrap";
				td.style.padding = "3px";
				td.style.color = "#5B5B5B";
	
				//fonts
				td.style.fontFamily = "Poppins";
				td.style.fontWeight = "500";
	
				var resE =
				  chart.tooltip.dataPoints[0].dataset.data[
					chart.tooltip.dataPoints[0].dataIndex
				  ]
					.toFixed(2)
					.replace(/[.,]00$/, "") +
				  " " +
				  parsedData.money;
	
				let iconDiv = document.createElement("div");
				iconDiv.style.height = "10px";
				iconDiv.style.width = "10px";
				iconDiv.style.display = "inline-block";
				iconDiv.style.borderRadius = "50px";
				iconDiv.style.backgroundColor =
				  chart.tooltip.labelColors[0].borderColor;
	
				//builder
				let text = document.createTextNode(" " + resE);
				td.appendChild(iconDiv);
				td.appendChild(text);
				tr.appendChild(td);
				tableBody.appendChild(tr);
			  });
	
			  const tableRoot = tooltipEl.querySelector("table");
			  tableRoot.style.backgroundColor = "#fff";
			  tableRoot.style.opacity = 1;
			  tableRoot.style.borderRadius = "10px";
			  tableRoot.style.border = "solid";
			  tableRoot.style.borderWidth = "0px";
			  tableRoot.style.borderColor = "#000";
	
			  // Remove old children
			  while (tableRoot.firstChild) {
				tableRoot.firstChild.remove();
			  }
	
			  // Add new children
	
			  tableRoot.appendChild(tableBody);
			}
	
			const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
	
			// Display, position, and set styles for font
			tooltipEl.style.opacity = 1;
			tooltipEl.style.backgroundColor = "#fff";
	
			tooltipEl.style.borderRadius = "8px";
			tooltipEl.style.border = "solid";
			tooltipEl.style.borderWidth = "0px";
			tooltipEl.style.borderColor = "#000";
			tooltipEl.style.boxShadow = "1px 1px 5px rgba(0, 0, 0, 0.45)";
			tooltipEl.style.font = tooltip.options.bodyFont.string;
			tooltipEl.style.padding = "8px";
			if (tooltipEl.clientHeight + tooltip.caretY < chart.height) {
			  tooltipEl.style.left = positionX + tooltip.caretX + "px";
			  tooltipEl.style.top = positionY + tooltip.caretY + "px";
			} else {
			  tooltipEl.style.left = positionX + tooltip.caretX + "px";
			  tooltipEl.style.top =
				positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
			}
		  };
		  //end
	
		  chartData = {
			labels: lblBAR,
			datasets: [
			  {
				label: "test",
				data: entered_barData,
				backgroundColor: ["rgba(13, 105, 134, 1)"],
				borderColor: ["rgba(13, 105, 134, 1)"],
				borderWidth: 1,
			  },
			],
		  };
		  chartOptions = {
			maintainAspectRatio: false,
			layout: {
			  padding: 10,
			},
			barThickness: 20,
			scales: {
			  x: {
				min: 0,
				max: 11,
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
				suggestedMin: minDataYbar,
				suggestedMax: maxValueBar, //maxDataYbar,
				ticks: {
				  callback: function (value, index, values) {
					return value + " "  + parsedData.money;
				  },
				},
			  },
			},
			layout: {
			  padding: 50,
			},
			responsive: true,
			plugins: {
			  afterDraw: function (chart, args, options) {},
			  legend: {
				display: false,
			  },
			  title: {
				display: true,
				color: "#2A2A2A",
				text: parsedData.title,
				padding: {
				  top: -30,
				  bottom: 0,
				},
				font: {
				  family: "Jost",
				  size: 18,
				  weight: "bold",
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  subtitle: {
				display: true,
				color: "#2A2A2A",
				text: parsedData.subtitle,
				padding: {
				  top: 0,
				  bottom: 20,
				},
				font: {
				  family: "Poppins",
				  size: 12,
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  tooltip: {
				enabled: false,
				position: "nearest",
				external: externalTooltipHandler2,
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
	
		  if (parsedData.onlyOne == false) {
			for (let i = 0; i < parsedData.data[0].length; i++) {
			  labelArr.push(parsedData.data[0][i].label);
			  waccArrData.push(parsedData.data[1][i].rNPV);
			  minus5.push(parsedData.data[0][i].rNPV);
			  plus5.push(parsedData.data[2][i].rNPV);
			  radarSum += parsedData.data[1][i].rNPV;
			  radarSumMinus += parsedData.data[0][i].rNPV;
			  radarSumPlus += parsedData.data[2][i].rNPV;
			}
		  } else {
			for (let i = 0; i < parsedData.data.length; i++) {
			  labelArr.push(parsedData.data[i].label);
			  waccArrData.push(parsedData.data[i].rNPV);
			  radarSum += parsedData.data[i].rNPV;
			}
		  }
	
		  var waccArr = waccArrData;
	
		  //labels
		  let label1 = parsedData.name + " -" + parsedData.percentage + "%";
		  let label2 = parsedData.name;
		  let label3 = parsedData.name + " +" + parsedData.percentage + "%";
	
		  if (parsedData.onlyOne == false) {
			datasetRadars = [
			  {
				label: label1,
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
		  } else {
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
			  },
			];
			legendDisplayRadar = {
			  display: false,
			};
		  }
	
		  chartData = {
			labels: labelArr,
			datasets: datasetRadars,
		  };
	
		  
		  		  //externalTooltipHandler3
					const getOrCreateTooltip32 = (chart) => {
						let tooltipEl = chart.canvas.parentNode.querySelector("table");
				
						if (!tooltipEl) {
						  tooltipEl = document.createElement("table");
						  tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
						  tooltipEl.style.borderRadius = "8px";
						  tooltipEl.style.color = "white";
						  tooltipEl.style.opacity = 1;
						  tooltipEl.style.pointerEvents = "none";
						  tooltipEl.style.position = "absolute";
						  tooltipEl.style.transform = "translate(-50%, 0)";
						  tooltipEl.style.transition = "all .1s ease";
				
						  const table = document.createElement("table");
						  table.style.margin = "0px";
				
						  tooltipEl.appendChild(table);
						  chart.canvas.parentNode.appendChild(tooltipEl);
						}
				
						return tooltipEl;
					  };
					//   let ies = 1;
				
					  const externalTooltipHandler32 = (context) => {
						// Tooltip Element
						const { chart, tooltip } = context;
						const tooltipEl = getOrCreateTooltip32(chart);
			
			
						// Hide if no tooltip
						if (tooltip.opacity === 0) {
						  tooltipEl.style.opacity = 0;
						  return;
						}
				

					let radarSum = 0;
					let radarSumMinus = 0;
					let radarSumPlus = 0;
					let radarSumFinal = 0;
				

					if (instance.data.movedDataMinus.length != 0) {
					  radarSumMinus = instance.data.movedDataMinus.reduce(
						(a, b) => a + b
					  );
					  radarSumPlus = instance.data.movedDataPlus.reduce(
						(a, b) => a + b
					  );
					  radarSum = instance.data.movedData.reduce((a, b) => a + b);
					} else {
					  if (parsedData.onlyOne == false) {
						for (let i = 0; i < parsedData.data[0].length; i++) {
						  radarSum += parsedData.data[1][i].rNPV;
						  radarSumMinus += parsedData.data[0][i].rNPV;
						  radarSumPlus += parsedData.data[2][i].rNPV;
						}
					  } else {
						if(instance.data.movedDataOne.length != 0){
							  radarSum = instance.data.movedDataOne.reduce(
								(a, b) => a + b
							  );
						}else{
							for (let i = 0; i < parsedData.data.length; i++) {
								radarSum += parsedData.data[i].rNPV;
							  }
						}
					  }
					}
						// Set Text
						if (tooltip.body) {
						  const bodyLines = tooltip.body.map((b) => b.lines);
				
						  const tableBody = document.createElement("tbody");
						  bodyLines.forEach((body, i) => {
							//rows
							const tr = document.createElement("tr");
							tr.style.backgroundColor = "inherit";
							tr.style.borderWidth = 0;
							tr.style.whiteSpace = "nowrap";
							const tr2 = document.createElement("tr");
							tr2.style.backgroundColor = "inherit";
							tr2.style.borderWidth = 0;
							tr2.style.whiteSpace = "nowrap";
							//collumns
							const td = document.createElement("td");
							td.style.borderWidth = 0;
							td.style.color = "#5B5B5B";
							td.style.width = "50px";
							td.style.fontSize = "12px";
							td.style.whiteSpace = "nowrap";
							td.style.padding = "3px";
							td.style.padding = "6px";

							const tdbtn = document.createElement("div");
							tdbtn.style.position = "relative";
							tdbtn.style.marginTop = "4px";
							tdbtn.style.borderWidth = "1px";
							tdbtn.style.border = "solid";
							tdbtn.style.borderColor = "#F59F26";
							tdbtn.style.borderRadius = "5px";
							tdbtn.style.backgroundColor = "#fff";
							tdbtn.style.marginLeft = "3px";
							tdbtn.style.marginRight = "3px";
							tdbtn.style.marginBottom = "3px";
							tdbtn.style.cursor = "pointer";
							tdbtn.style.color = "#fff";
							// tdbtn.style.width = "100%";
							tdbtn.style.height = "40px";
							tdbtn.style.fontSize = "12px";
							tdbtn.style.whiteSpace = "nowrap";
							tdbtn.style.padding = "3px";
				
							var tdbtnvert = document.createElement("div");
							tdbtnvert.style.margin = "0";
							tdbtnvert.style.position = "absolute";
							tdbtnvert.style.top = "50%";
							tdbtnvert.style.backgroundColor = "#fff";
							tdbtnvert.style.transform = "translateY(-50%)";
							tdbtnvert.style.left = "50%";
							tdbtnvert.style.top = "50%";
							tdbtnvert.style.transform = "translate(-50%, -50%)";
							//fonts
					
							td.style.fontFamily = "Jost";
							td.style.fontWeight = "600";
							tdbtn.style.display = "block";
							tdbtn.style.fontFamily = "Jost";
							tdbtn.style.fontWeight = "600";
							tdbtn.style.fontSize = "16px";
							tdbtn.style.verticalAlign = "bottom";
							var resE ="test"
					  if(parsedData.onlyOne == true){
							resE = context.tooltip.title[0] + " " +context.tooltip.dataPoints[0].raw.toFixed(2).replace(/[.,]00$/, "")+ parsedData.money +" "+ Math.round((context.tooltip.dataPoints[0].raw*100)/radarSum) +"%" 
						}else{
						if(context.tooltip.dataPoints[0].datasetIndex == 2){
							resE = context.tooltip.title[0] + " " +context.tooltip.dataPoints[0].raw.toFixed(2).replace(/[.,]00$/, "")+ parsedData.money +" "+ Math.round((context.tooltip.dataPoints[0].raw*100)/radarSumPlus)+"%" 
						}else if(context.tooltip.dataPoints[0].datasetIndex == 1){
							resE = context.tooltip.title[0] + " " +context.tooltip.dataPoints[0].raw.toFixed(2).replace(/[.,]00$/, "") + parsedData.money +" "+ Math.round((context.tooltip.dataPoints[0].raw*100)/radarSum) +"%" 
						}else{
							resE = context.tooltip.title[0] + " " + context.tooltip.dataPoints[0].raw.toFixed(2).replace(/[.,]00$/, "") + parsedData.money +" "+ Math.round((context.tooltip.dataPoints[0].raw*100)/radarSumMinus) +"%" 
						}
					  }

							//builder
							let text = document.createTextNode(" " + resE);
							td.appendChild(text);
							tr.appendChild(td);
					
							tableBody.appendChild(tr);
						  });
							
						  const tableRoot = tooltipEl.querySelector("table");
						  tableRoot.style.backgroundColor = "#fff";
						  tableRoot.style.opacity = 1;
						  tableRoot.style.borderRadius = "10px";
						  tableRoot.style.border = "solid";
						  tableRoot.style.borderWidth = "0px";
						  tableRoot.style.borderColor = "#000";
				
						  // Remove old children
						  while (tableRoot.firstChild) {
							tableRoot.firstChild.remove();
						  }
				
						  tableRoot.appendChild(tableBody);
						}
						const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
						// Display, position, and set styles for font
						tooltipEl.style.opacity = 1;
						tooltipEl.style.backgroundColor = "#fff";
				
						tooltipEl.style.borderRadius = "8px";
						tooltipEl.style.border = "solid";
						tooltipEl.style.borderWidth = "0px";
						tooltipEl.style.borderColor = "#000";
						tooltipEl.style.boxShadow = "1px 1px 5px rgba(0, 0, 0, 0.45)";
						tooltipEl.style.font = tooltip.options.bodyFont.string;
						tooltipEl.style.padding = "8px";
						tooltip.onclick = function () {
						  console.log("test");
						};
				
						if (chart.tooltip.dataPoints[0].dataIndex == 2) {
						  tooltipEl.style.left =
							positionX + tooltip.caretX + tooltip.width / 4 + "px";
						  tooltipEl.style.top =
							positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
						} else if (chart.tooltip.dataPoints[0].dataIndex == 0) {
						  tooltipEl.style.left =
							positionX + tooltip.caretX + tooltip.width / 4 + "px";
						  tooltipEl.style.top =
							positionY + tooltip.caretY - tooltipEl.clientHeight + 10 + "px";
						} else {
						  tooltipEl.style.left =
							positionX + tooltip.caretX + tooltip.width / 4 + "px";
						  tooltipEl.style.top =
							positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
						}
					  };
					  //end


		  chartOptions = {
			maintainAspectRatio: false,
			// aspectRatio: 1,
			layout: {
			  padding: {
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
			  },
			},
			legend: {
			  labels: {
				boxWidth: 10,
			  },
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
					return value + " " + parsedData.money;
				  },
				},
			  },
			},
			plugins: {
			  title: {
				display: true,
				color: "#2A2A2A",
				text: parsedData.title,
				padding: {
				  top: 0,
				  bottom: 0,
				},
				font: {
				  family: "Jost",
				  size: 18,
				  weight: "bold",
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  subtitle: {
				display: true,
				color: "#2A2A2A",
				text: parsedData.subtitle,
				padding: {
				  top: 0,
				  bottom: 10,
				},
				font: {
				  family: "Poppins",
				  size: 12,
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  legend: legendDisplayRadar,
			  tooltip: {
				enabled: false,
				position: "nearest",
				external: externalTooltipHandler32,
			  },
			  //   tooltip: {
			// 	backgroundColor: "#FFFFFF",

			// 	caretSize: 0,
			// 	titleColor: "rgba(91, 91, 91, 1)",
			// 	borderColor: "rgba(152, 152, 152, 0.49)",
			// 	borderWidth: 1,
			// 	borderRadius: 15,
			// 	titleAlign: "center",
			// 	bodySpacing: 5,
			// 	bodyFont: {
			// 	  weight: "bold",
			// 	  size: 0,
			// 	},
			// 	footerMarginTop: 20,
			// 	titleFont: {
			// 	  family: "Jost",
			// 	  weight: "600",
			// 	  size: 12,
			// 	},
			// 	padding: {
			// 	  left: 20,
			// 	  right: 20,
			// 	  top: 5,
			// 	  bottom: -5,
			// 	},
			// 	displayColors: false,
			// 	yAlign: "bottom",
			// 	xAlign: "left",
			// 	callbacks: {
			// 	  title: function (context) {
			// 		let radarSum = 0;
			// 		let radarSumMinus = 0;
			// 		let radarSumPlus = 0;
			// 		let finalVal = [];
			// 		let radarSumFinal = 0;
			// 		if (instance.data.movedDataMinus.length != 0) {
			// 		  radarSumMinus = instance.data.movedDataMinus.reduce(
			// 			(a, b) => a + b
			// 		  );
			// 		  radarSumPlus = instance.data.movedDataPlus.reduce(
			// 			(a, b) => a + b
			// 		  );
			// 		  radarSum = instance.data.movedData.reduce((a, b) => a + b);
			// 		} else {
			// 		  if (parsedData.onlyOne == false) {
			// 			for (let i = 0; i < parsedData.data[0].length; i++) {
			// 			  radarSum += parsedData.data[1][i].rNPV;
			// 			  radarSumMinus += parsedData.data[0][i].rNPV;
			// 			  radarSumPlus += parsedData.data[2][i].rNPV;
			// 			}
			// 		  } else {
			// 			if(instance.data.movedDataOne.length != 0){
			// 				  radarSum = instance.data.movedDataOne.reduce(
			// 					(a, b) => a + b
			// 				  );
			// 			}else{
			// 				for (let i = 0; i < parsedData.data.length; i++) {
			// 					radarSum += parsedData.data[i].rNPV;
			// 				  }
			// 			}
			// 		  }
			// 		}
			// 		if (context[0].datasetIndex == 0) {
			// 		  radarSumFinal = radarSumMinus;
			// 		} else if (context[0].datasetIndex == 1) {
			// 		  radarSumFinal = radarSum;
			// 		} else if (context[0].datasetIndex == 2) {
			// 		  radarSumFinal = radarSumPlus;
			// 		}
			// 		if (parsedData.onlyOne == true) {
			// 		  radarSumFinal = radarSum;
			// 		}
			// 		return (
			// 		  context[0].label +
			// 		  " " +
			// 		  context[0].raw.toFixed(2).replace(/[.,]00$/, "") +
			// 		  money +
			// 		  parsedData.money +
			// 		  " " +
			// 		  Math.round((context[0].raw * 100) / radarSumFinal) +
			// 		  "%"
			// 		);
			// 		//}
			// 	  },
			// 	},
			//   },
			},
		  };
		  break;
		
		  case "radar2":
			var datasetRadars = [];
			var legendDisplayRadar = {};
			chart = "radar";
			var minus5 = [];
			var plus5 = [];
			let labelArr2 = [];
			let waccArrData2 = [];
			let waccArrData2_1 = [];
			let radarSum2 = 0;
			let radarSum2_1 = 0;
			parsedData.data[1].things[0].rNPV
			  for (let i = 0; i < parsedData.data[0].things.length; i++) {
				labelArr2.push(parsedData.data[0].things[i].label);
				waccArrData2.push(parsedData.data[0].things[i].rNPV);
				waccArrData2_1.push(parsedData.data[1].things[i].rNPV);
				radarSum2 += parsedData.data[0].things[i].rNPV;
				radarSum2_1 += parsedData.data[1].things[i].rNPV;
			  }
	  
			var waccArr = waccArrData2;
			var waccArr_1 = waccArrData2_1;

			//labels
			let label1e = parsedData.data[0].label;
			let label2e = parsedData.data[1].label;
			  datasetRadars = [
				{
				  label: label1e,
				  data: waccArr,
				  fill: true,
				  backgroundColor: "rgba(233, 163, 68, 0.4)",
				  borderColor: "#F59F26",
				  pointBackgroundColor: "#F59F26",
				  pointBorderColor: "#F59F26",
				  pointHoverBackgroundColor: "#fff",
				  pointHoverBorderColor: "#F59F26",
				  pointRadius: 4,
				},
				{
					label: label2e,
					data: waccArr_1,
					fill: true,
					backgroundColor: "rgba(255, 230, 197, 0.3)",
					borderColor: "#F59F26",
					pointBackgroundColor: "#F59F26",
					pointBorderColor: "#F59F26",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "#F59F26",
					pointRadius: 4,
				  },
			  ];
			  legendDisplayRadar = {
				position: "right",
				display: true,
				labels: {
				  padding: 10,
				  boxWidth: 16,
				  boxHeight: 16,
				},
			  };
			
	  
			chartData = {
			  labels: labelArr2,
			  datasets: datasetRadars,
			};
	  
			
					  //externalTooltipHandler3
					  const getOrCreateTooltip32e = (chart) => {
						  let tooltipEl = chart.canvas.parentNode.querySelector("table");
				  
						  if (!tooltipEl) {
							tooltipEl = document.createElement("table");
							tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
							tooltipEl.style.borderRadius = "8px";
							tooltipEl.style.color = "white";
							tooltipEl.style.opacity = 1;
							tooltipEl.style.pointerEvents = "none";
							tooltipEl.style.position = "absolute";
							tooltipEl.style.transform = "translate(-50%, 0)";
							tooltipEl.style.transition = "all .1s ease";
				  
							const table = document.createElement("table");
							table.style.margin = "0px";
				  
							tooltipEl.appendChild(table);
							chart.canvas.parentNode.appendChild(tooltipEl);
						  }
				  
						  return tooltipEl;
						};
					  //   let ies = 1;
				  
						const externalTooltipHandler32e = (context) => {
						  // Tooltip Element
						  const { chart, tooltip } = context;
						  const tooltipEl = getOrCreateTooltip32e(chart);
			  
			  
						  // Hide if no tooltip
						  if (tooltip.opacity === 0) {
							tooltipEl.style.opacity = 0;
							return;
						  }
				  
  
					  if (instance.data.movedDataU1.length != 0) {
						radarSum2_1 = instance.data.movedDataU2.reduce((a, b) => a + b);
						radarSum2 = instance.data.movedDataU1.reduce((a, b) => a + b);
					  } 
						  // Set Text
						  if (tooltip.body) {
							const bodyLines = tooltip.body.map((b) => b.lines);
				  
							const tableBody = document.createElement("tbody");
							bodyLines.forEach((body, i) => {
							  //rows
							  const tr = document.createElement("tr");
							  tr.style.backgroundColor = "inherit";
							  tr.style.borderWidth = 0;
							  tr.style.whiteSpace = "nowrap";
							  const tr2 = document.createElement("tr");
							  tr2.style.backgroundColor = "inherit";
							  tr2.style.borderWidth = 0;
							  tr2.style.whiteSpace = "nowrap";
							  //collumns
							  const td = document.createElement("td");
							  td.style.borderWidth = 0;
							  td.style.color = "#5B5B5B";
							  td.style.width = "50px";
							  td.style.fontSize = "12px";
							  td.style.whiteSpace = "nowrap";
							  td.style.padding = "3px";
							  td.style.padding = "6px";
  
							  const tdbtn = document.createElement("div");
							  tdbtn.style.position = "relative";
							  tdbtn.style.marginTop = "4px";
							  tdbtn.style.borderWidth = "1px";
							  tdbtn.style.border = "solid";
							  tdbtn.style.borderColor = "#F59F26";
							  tdbtn.style.borderRadius = "5px";
							  tdbtn.style.backgroundColor = "#fff";
							  tdbtn.style.marginLeft = "3px";
							  tdbtn.style.marginRight = "3px";
							  tdbtn.style.marginBottom = "3px";
							  tdbtn.style.cursor = "pointer";
							  tdbtn.style.color = "#fff";
							  // tdbtn.style.width = "100%";
							  tdbtn.style.height = "40px";
							  tdbtn.style.fontSize = "12px";
							  tdbtn.style.whiteSpace = "nowrap";
							  tdbtn.style.padding = "3px";
				  
							  var tdbtnvert = document.createElement("div");
							  tdbtnvert.style.margin = "0";
							  tdbtnvert.style.position = "absolute";
							  tdbtnvert.style.top = "50%";
							  tdbtnvert.style.backgroundColor = "#fff";
							  tdbtnvert.style.transform = "translateY(-50%)";
							  tdbtnvert.style.left = "50%";
							  tdbtnvert.style.top = "50%";
							  tdbtnvert.style.transform = "translate(-50%, -50%)";
							  //fonts
					  
							  td.style.fontFamily = "Jost";
							  td.style.fontWeight = "600";
							  tdbtn.style.display = "block";
							  tdbtn.style.fontFamily = "Jost";
							  tdbtn.style.fontWeight = "600";
							  tdbtn.style.fontSize = "16px";
							  tdbtn.style.verticalAlign = "bottom";
							  var resE ="test"
						  if(context.tooltip.dataPoints[0].datasetIndex == 1){
							  resE = context.tooltip.title[0] + " " +context.tooltip.dataPoints[0].raw.toFixed(2).replace(/[.,]00$/, "") + parsedData.money +" "+ Math.round((context.tooltip.dataPoints[0].raw*100)/radarSum2_1) +"%" 
						  }else{
							  resE = context.tooltip.title[0] + " " + context.tooltip.dataPoints[0].raw.toFixed(2).replace(/[.,]00$/, "") + parsedData.money +" "+ Math.round((context.tooltip.dataPoints[0].raw*100)/radarSum2) +"%" 
							}
  
							  //builder
							  let text = document.createTextNode(" " + resE);
							  td.appendChild(text);
							  tr.appendChild(td);
					  
							  tableBody.appendChild(tr);
							});
							  
							const tableRoot = tooltipEl.querySelector("table");
							tableRoot.style.backgroundColor = "#fff";
							tableRoot.style.opacity = 1;
							tableRoot.style.borderRadius = "10px";
							tableRoot.style.border = "solid";
							tableRoot.style.borderWidth = "0px";
							tableRoot.style.borderColor = "#000";
				  
							// Remove old children
							while (tableRoot.firstChild) {
							  tableRoot.firstChild.remove();
							}
				  
							tableRoot.appendChild(tableBody);
						  }
						  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
						  // Display, position, and set styles for font
						  tooltipEl.style.opacity = 1;
						  tooltipEl.style.backgroundColor = "#fff";
				  
						  tooltipEl.style.borderRadius = "8px";
						  tooltipEl.style.border = "solid";
						  tooltipEl.style.borderWidth = "0px";
						  tooltipEl.style.borderColor = "#000";
						  tooltipEl.style.boxShadow = "1px 1px 5px rgba(0, 0, 0, 0.45)";
						  tooltipEl.style.font = tooltip.options.bodyFont.string;
						  tooltipEl.style.padding = "8px";
						  tooltip.onclick = function () {
							console.log("test");
						  };
				  
						  if (chart.tooltip.dataPoints[0].dataIndex == 2) {
							tooltipEl.style.left =
							  positionX + tooltip.caretX + tooltip.width / 4 + "px";
							tooltipEl.style.top =
							  positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
						  } else if (chart.tooltip.dataPoints[0].dataIndex == 0) {
							tooltipEl.style.left =
							  positionX + tooltip.caretX + tooltip.width / 4 + "px";
							tooltipEl.style.top =
							  positionY + tooltip.caretY - tooltipEl.clientHeight + 10 + "px";
						  } else {
							tooltipEl.style.left =
							  positionX + tooltip.caretX + tooltip.width / 4 + "px";
							tooltipEl.style.top =
							  positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
						  }
						};
						//end
  
  
			chartOptions = {
			  maintainAspectRatio: false,
			  // aspectRatio: 1,
			  layout: {
				padding: {
				  top: 0,
				  left: 0,
				  bottom: 0,
				  right: 0,
				},
			  },
			  legend: {
				labels: {
				  boxWidth: 10,
				},
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
					  return value + " " + parsedData.money;
					},
				  },
				},
			  },
			  plugins: {
				title: {
				  display: true,
				  color: "#2A2A2A",
				  text: parsedData.title,
				  padding: {
					top: 0,
					bottom: 0,
				  },
				  font: {
					family: "Jost",
					size: 18,
					weight: "bold",
					lineHeight: 1.2,
				  },
				  align: "start",
				},
				subtitle: {
				  display: true,
				  color: "#2A2A2A",
				  text: parsedData.subtitle,
				  padding: {
					top: 0,
					bottom: 10,
				  },
				  font: {
					family: "Poppins",
					size: 12,
					lineHeight: 1.2,
				  },
				  align: "start",
				},
				legend: legendDisplayRadar,
				tooltip: {
				  enabled: false,
				  position: "nearest",
				  external: externalTooltipHandler32e,
				},
			  },
			};
			break;
		  case "doughnut-pie":
		  chart = "doughnut";
		  let labelExtractor = [];
		  let npvDataExtractor = [];
		  for (let i = 0; i < parsedData.data.length; i++) {
			labelExtractor.push(parsedData.data[i].label);
			npvDataExtractor.push(parsedData.data[i].rNPV);
		  }
		  instance.data.doughnutGroupVal = npvDataExtractor.reduce((a, b) => a + b, 0);
		  var doughnutShortener = "";
	
		  instance.data.centerValue =
		  instance.data.doughnutGroupVal.toFixed(2).replace(/[.,]00$/, "") +
			" " +
			parsedData.money;
	
		  var changedLabels = [];
		  
		  for (label in labelExtractor) {
			let lbl =
			  labelExtractor[label] +
			  " " +
			  Math.round((npvDataExtractor[label] * 100) / instance.data.doughnutGroupVal) +
			  "%";
			changedLabels.push(lbl);
		  }
		  let colorarrforbackground = [];
		  if (npvDataExtractor.length < 6) {
			colorarrforbackground = [
			  "#F6A536",
			  "#FEE0B9",
			  "#FCC379",
			  "#FDD299",
			  "#F9B558",
			  "#EF9722",
			];
		  } else {
			colorarrforbackground = [
			  "#F6A536",
			  "#FEE0B9",
			  "#FCC379",
			  "#FDD299",
			  "#F9B558",
			  "#EF9722",
			  "#E5891B",
			  "#DA7B15",
			  "#CE6E10",
			];
		  }
		  instance.data.moneySign = money;
		  instance.data.parsedmoney = parsedData.money;
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


		  		  //externalTooltipHandler3
					const getOrCreateTooltip31 = (chart) => {
						let tooltipEl = chart.canvas.parentNode.querySelector("table");
				
						if (!tooltipEl) {
						  tooltipEl = document.createElement("table");
						  tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
						  tooltipEl.style.borderRadius = "8px";
						  tooltipEl.style.color = "white";
						  tooltipEl.style.opacity = 1;
						  tooltipEl.style.pointerEvents = "none";
						  tooltipEl.style.position = "absolute";
						  tooltipEl.style.transform = "translate(-50%, 0)";
						  tooltipEl.style.transition = "all .1s ease";
				
						  const table = document.createElement("table");
						  table.style.margin = "0px";
				
						  tooltipEl.appendChild(table);
						  chart.canvas.parentNode.appendChild(tooltipEl);
						}
				
						return tooltipEl;
					  };
					//   let ies = 1;
				
					  const externalTooltipHandler31 = (context) => {
						// Tooltip Element
						const { chart, tooltip } = context;
						const tooltipEl = getOrCreateTooltip31(chart);
			
			
						// Hide if no tooltip
						if (tooltip.opacity === 0) {
						  tooltipEl.style.opacity = 0;
						  return;
						}
				
						// Set Text
						if (tooltip.body) {
						  const bodyLines = tooltip.body.map((b) => b.lines);
				
						  const tableBody = document.createElement("tbody");
						  bodyLines.forEach((body, i) => {
							//rows
							const tr = document.createElement("tr");
							tr.style.backgroundColor = "inherit";
							tr.style.borderWidth = 0;
							tr.style.whiteSpace = "nowrap";
							const tr2 = document.createElement("tr");
							tr2.style.backgroundColor = "inherit";
							tr2.style.borderWidth = 0;
							tr2.style.whiteSpace = "nowrap";
							//collumns
							const td = document.createElement("td");
							td.style.borderWidth = 0;
							td.style.color = "#5B5B5B";
							td.style.width = "50px";
							td.style.fontSize = "12px";
							td.style.whiteSpace = "nowrap";
							td.style.padding = "3px";
							td.style.padding = "6px";

							const tdbtn = document.createElement("div");
							tdbtn.style.position = "relative";
							tdbtn.style.marginTop = "4px";
							tdbtn.style.borderWidth = "1px";
							tdbtn.style.border = "solid";
							tdbtn.style.borderColor = "#F59F26";
							tdbtn.style.borderRadius = "5px";
							tdbtn.style.backgroundColor = "#fff";
							tdbtn.style.marginLeft = "3px";
							tdbtn.style.marginRight = "3px";
							tdbtn.style.marginBottom = "3px";
							tdbtn.style.cursor = "pointer";
							tdbtn.style.color = "#fff";
							// tdbtn.style.width = "100%";
							tdbtn.style.height = "40px";
							tdbtn.style.fontSize = "12px";
							tdbtn.style.whiteSpace = "nowrap";
							tdbtn.style.padding = "3px";
				
							var tdbtnvert = document.createElement("div");
							tdbtnvert.style.margin = "0";
							tdbtnvert.style.position = "absolute";
							tdbtnvert.style.top = "50%";
							tdbtnvert.style.backgroundColor = "#fff";
							tdbtnvert.style.transform = "translateY(-50%)";
							tdbtnvert.style.left = "50%";
							tdbtnvert.style.top = "50%";
							tdbtnvert.style.transform = "translate(-50%, -50%)";
							//fonts
					
							td.style.fontFamily = "Jost";
							td.style.fontWeight = "600";
							tdbtn.style.display = "block";
							tdbtn.style.fontFamily = "Jost";
							tdbtn.style.fontWeight = "600";
							tdbtn.style.fontSize = "16px";
							tdbtn.style.verticalAlign = "bottom";
							var resE =
							  chart.boxes[0].legendItems[
								chart.tooltip.dataPoints[0].dataIndex
							  ].text.replace(/\d+% ?/g, "") +
							  " " +
							  chart.tooltip.dataPoints[0].dataset.data[
								chart.tooltip.dataPoints[0].dataIndex
							  ] +
							  instance.data.parsedmoney +
							  " " +
							  Math.round(
								(chart.tooltip.dataPoints[0].dataset.data[
								  chart.tooltip.dataPoints[0].dataIndex
								] *
								  100) /
								  instance.data.doughnutGroupVal
							  ) +
							  "%";
				
							//builder
							let text = document.createTextNode(" " + resE);
							let text2 = document.createTextNode("View Inputs →");
							td.appendChild(text);
							tdbtn.appendChild(tdbtnvert);
							tdbtnvert.appendChild(text2);
							tdbtnvert.style.color = "#F59F26";
							
							tr.appendChild(td);
					
							tableBody.appendChild(tr);
							tableBody.appendChild(tr2);
						  });
							
						  const tableRoot = tooltipEl.querySelector("table");
							tableRoot.style.backgroundColor = "#fff";
						  tableRoot.style.opacity = 1;
						  tableRoot.style.borderRadius = "10px";
						  tableRoot.style.border = "solid";
						  tableRoot.style.borderWidth = "0px";
						  tableRoot.style.borderColor = "#000";
				
						  // Remove old children
						  while (tableRoot.firstChild) {
							tableRoot.firstChild.remove();
						  }
				
						  tableRoot.appendChild(tableBody);
						}
						const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
						// Display, position, and set styles for font
						tooltipEl.style.opacity = 1;
						tooltipEl.style.backgroundColor = "#fff";
				
						tooltipEl.style.borderRadius = "8px";
						tooltipEl.style.border = "solid";
						tooltipEl.style.borderWidth = "0px";
						tooltipEl.style.borderColor = "#000";
						tooltipEl.style.boxShadow = "1px 1px 5px rgba(0, 0, 0, 0.45)";
						tooltipEl.style.font = tooltip.options.bodyFont.string;
						tooltipEl.style.padding = "8px";
						tooltip.onclick = function () {
						  console.log("test");
						};
				
						if (chart.tooltip.dataPoints[0].dataIndex == 2) {
						  tooltipEl.style.left =
							positionX + tooltip.caretX + tooltip.width / 4 + "px";
						  tooltipEl.style.top =
							positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
						} else if (chart.tooltip.dataPoints[0].dataIndex == 0) {
						  tooltipEl.style.left =
							positionX + tooltip.caretX + tooltip.width / 4 + "px";
						  tooltipEl.style.top =
							positionY + tooltip.caretY - tooltipEl.clientHeight + 10 + "px";
						} else {
						  tooltipEl.style.left =
							positionX + tooltip.caretX + tooltip.width / 4 + "px";
						  tooltipEl.style.top =
							positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
						}
					  };
					  //end
	
		  chartOptions = {
			maintainAspectRatio: false,
			layout: {
			  padding: 10,
			},
			responsive: true,
			cutout: "60%",
			plugins: {
			  title: {
				display: true,
				color: "#2A2A2A",
				text: parsedData.title,
				padding: {
				  top: 3,
				  bottom: 8,
				},
				font: {
				  family: "Jost",
				  size: 18,
				  weight: "bold",
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  subtitle: {
				display: true,
				color: "#2A2A2A",
				text: parsedData.subtitle,
				padding: {
				  top: 0,
				  bottom: 20,
				},
				font: {
				  family: "Poppins",
				  size: 12,
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  legend: {
				onClick: function (e) {},
				position: "right",
				display: true,
				labels: {
				usePointStyle: true,
				pointStyle: 'rectRounded',
				boxWidth: 15,
				  padding: 18,
				},
			  },
			  tooltip: {
				enabled: false,
				position: "nearest",
				external: externalTooltipHandler31,
			  },
			},
		  };
	  
		  chartPlugin = [];
	
		  if (instanceContainer.clientWidth <= 449) {
			chartOptions.responsive = true;
			chartOptions.maintainAspectRatio = false;
			chartOptions.aspectRatio = 0.4;
			chartOptions.plugins.legend.position = "bottom";
			chartOptions.plugins.subtitle.padding.bottom = 10;
		  }
	
		  break;
		case "doughnut-pie-diff":
		  chart = "doughnut";
		  instance.data.moneySign = money;
		  instance.data.parsedmoney = parsedData.money;
		  let newlabelExtractor = [];
		  let newnpvDataExtractor = [];
		  let oldnpvDataExtractor = [];
	
		  for (let i = 0; i < parsedData.data.length; i++) {
			newlabelExtractor.push(parsedData.data[i].label);
			instance.data.newnpvDataExtractor.push(parsedData.data[i].rNPV);
			instance.data.oldnpvDataExtractor.push(parsedData.old_data[i].rNPV);
		  }
	
		  instance.data.doughnutGroupVal = instance.data.newnpvDataExtractor.reduce((a, b) => a + b, 0);
		  instance.data.doughnutGroupVal2 = instance.data.oldnpvDataExtractor.reduce((a, b) => a + b, 0);
		  var doughnutShortener = "";
		  instance.data.centerValue = instance.data.doughnutGroupVal.toFixed(2).replace(/[.,]00$/, "");
		  let doughnutBackgroundColor = [
			"#F6A536",
			"#FEE0B9",
			"#FCC379",
			"#FDD299",
			"#F9B558",
			"#EF9722",
		  ]; // bad go through colors
		  let doughnutBackgroundColorBLUE = ["#15A8D7", "#7BD6F2", "#0D6986"];
		  if (instance.data.newnpvDataExtractor.length < 6) {
			doughnutBackgroundColor = [
			  "#F6A536",
			  "#FEE0B9",
			  "#FCC379",
			  "#FDD299",
			  "#F9B558",
			  "#EF9722",
			]; // bad go through colors
			doughnutBackgroundColorBLUE = [
			  "#15A8D7",
			  "#7BD6F2",
			  "#0D6986",
			  "#0B5870",
			  "#BDE9F9",
			  "#E7F0F3",
			];
		  } else {
			doughnutBackgroundColor = [
			  "#F6A536",
			  "#FEE0B9",
			  "#FCC379",
			  "#FDD299",
			  "#F9B558",
			  "#EF9722",
			  "#E5891B",
			  "#DA7B15",
			  "#CE6E10",
			];
			doughnutBackgroundColorBLUE = [
			  "#15A8D7",
			  "#7BD6F2",
			  "#0D6986",
			  "#0B5870",
			  "#BDE9F9",
			  "#E7F0F3",
			  "#094659",
			  "#1D3942",
			  "#021216",
			];
		  }
	
		  let colorsNstufforange = [];
		  let colorsNstuffblue = [];
		  let esta = 0;
	
		  for (let i = 0; i < parsedData.data.length; i++) {
			colorsNstufforange.push(doughnutBackgroundColor[esta]);
			colorsNstuffblue.push(doughnutBackgroundColorBLUE[esta]);
			esta++;
		  }
		  doughnutBackgroundColorBLUE = colorsNstuffblue;
		  doughnutBackgroundColor = colorsNstufforange;
	
		  let doughnutBackgroundColorNEW = [];
		  let percentageIdf1 = [];
		  let percentageIdf2 = [];
		  let clickableData = [];
		  for (let i = 0; i < instance.data.newnpvDataExtractor.length; i++) {
			let e = Math.round((instance.data.newnpvDataExtractor[i] * 100) / instance.data.doughnutGroupVal);
			let e2 = Math.round((instance.data.oldnpvDataExtractor[i] * 100) / instance.data.doughnutGroupVal2);
			percentageIdf1.push(e);
			percentageIdf2.push(e2);
			if (percentageIdf1[i] == percentageIdf2[i]) {
			  doughnutBackgroundColorNEW.push(doughnutBackgroundColor[i]);
			} else {
			  doughnutBackgroundColorNEW.push(doughnutBackgroundColorBLUE[i]);
			  clickableData.push(i);
			}
		  }
	
		  instance.data.centerValue =
		  instance.data.doughnutGroupVal.toFixed(2).replace(/[.,]00$/, "") +
			" " +
			parsedData.money;
	
		  //externalTooltipHandler3
		  const getOrCreateTooltip3 = (chart) => {
			let tooltipEl = chart.canvas.parentNode.querySelector("table");
	
			if (!tooltipEl) {
			  tooltipEl = document.createElement("table");
			  tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
			  tooltipEl.style.borderRadius = "8px";
			  tooltipEl.style.color = "white";
			  tooltipEl.style.opacity = 1;
			  tooltipEl.style.pointerEvents = "none";
			  tooltipEl.style.position = "absolute";
			  tooltipEl.style.transform = "translate(-50%, 0)";
			  tooltipEl.style.transition = "all .1s ease";
	
			  const table = document.createElement("table");
			  table.style.margin = "0px";
	
			  tooltipEl.appendChild(table);
			  chart.canvas.parentNode.appendChild(tooltipEl);
			}
	
			return tooltipEl;
		  };
		//   let iess = 1;
	
		  const externalTooltipHandler3 = (context) => {
			// Tooltip Element
			const { chart, tooltip } = context;
			const tooltipEl = getOrCreateTooltip3(chart);


			// Hide if no tooltip
			if (tooltip.opacity === 0) {
			  tooltipEl.style.opacity = 0;
			  return;
			}
	
			// Set Text
			if (tooltip.body) {
			  const bodyLines = tooltip.body.map((b) => b.lines);
	
			  const tableBody = document.createElement("tbody");
			  bodyLines.forEach((body, i) => {
				//rows
				const tr = document.createElement("tr");
				tr.style.backgroundColor = "inherit";
				tr.style.borderWidth = 0;
				tr.style.whiteSpace = "nowrap";
				const tr2 = document.createElement("tr");
				tr2.style.backgroundColor = "inherit";
				tr2.style.borderWidth = 0;
				tr2.style.whiteSpace = "nowrap";
				//collumns
				const td = document.createElement("td");
				td.style.borderWidth = 0;
				td.style.color = "#5B5B5B";
				td.style.width = "50px";
				td.style.fontSize = "12px";
				td.style.whiteSpace = "nowrap";
				td.style.padding = "6px";

				const tdbtn = document.createElement("div");
				tdbtn.style.position = "relative";
				tdbtn.style.marginTop = "4px";
				tdbtn.style.borderWidth = "1px";
				tdbtn.style.border = "solid";
				tdbtn.style.borderColor = "#F59F26";
				tdbtn.style.borderRadius = "5px";
				tdbtn.style.backgroundColor = "#fff";
				// tdbtn.style.width = "95%";
				tdbtn.style.marginLeft = "3px";
				tdbtn.style.marginRight = "3px";
				tdbtn.style.marginBottom = "3px";
				tdbtn.style.cursor = "pointer";
	
				tdbtn.style.color = "#fff";
				// tdbtn.style.width = "100%";
				tdbtn.style.height = "40px";
				tdbtn.style.fontSize = "12px";
				tdbtn.style.whiteSpace = "nowrap";
				tdbtn.style.padding = "3px";
	
				var tdbtnvert = document.createElement("div");
				tdbtnvert.style.margin = "0";
				tdbtnvert.style.position = "absolute";
				tdbtnvert.style.top = "50%";
				tdbtnvert.style.backgroundColor = "#fff";
				tdbtnvert.style.transform = "translateY(-50%)";
				tdbtnvert.style.left = "50%";
				tdbtnvert.style.top = "50%";
				tdbtnvert.style.transform = "translate(-50%, -50%)";
				//fonts
				td.style.fontFamily = "Jost";
				td.style.fontWeight = "600";
				tdbtn.style.display = "block";
				tdbtn.style.fontFamily = "Jost";
				tdbtn.style.fontWeight = "600";
				tdbtn.style.fontSize = "16px";
				tdbtn.style.verticalAlign = "bottom";
				var resE =
				  chart.boxes[0].legendItems[
					chart.tooltip.dataPoints[0].dataIndex
				  ].text.replace(/\d+% ?/g, "") +
				  " " +
				  chart.tooltip.dataPoints[0].dataset.data[
					chart.tooltip.dataPoints[0].dataIndex
				  ] +
				  instance.data.parsedmoney +
				  " " +
				  Math.round(
					(chart.tooltip.dataPoints[0].dataset.data[
					  chart.tooltip.dataPoints[0].dataIndex
					] *
					  100) /
					  instance.data.doughnutGroupVal
				  ) +
				  "%";
	
				//builder
				let text = document.createTextNode(" " + resE);
				let text2 = document.createTextNode("View Inputs →");
				td.appendChild(text);
				tdbtn.appendChild(tdbtnvert);
				tdbtnvert.appendChild(text2);
				tdbtnvert.style.color = "#F59F26";
	
				tr.appendChild(td);
				// console.log('testONE')
				if (
				  Math.round(
					(instance.data.oldnpvDataExtractor[chart.tooltip.dataPoints[0].dataIndex] *
					  100) /
					  instance.data.doughnutGroupVal2
				  ) ==
				  Math.round(
					(chart.tooltip.dataPoints[0].dataset.data[
					  chart.tooltip.dataPoints[0].dataIndex
					] *
					  100) /
					  instance.data.doughnutGroupVal
				  )
				) {
				} else {
				  tr2.appendChild(tdbtn);
				}
				tableBody.appendChild(tr);
				tableBody.appendChild(tr2);
			  });
				
			  const tableRoot = tooltipEl.querySelector("table");
			  tableRoot.style.backgroundColor = "#fff";
			  tableRoot.style.opacity = 1;
			  tableRoot.style.borderRadius = "10px";
			  tableRoot.style.border = "solid";
			  tableRoot.style.borderWidth = "0px";
			  tableRoot.style.borderColor = "#000";
	
			  // Remove old children
			  while (tableRoot.firstChild) {
				tableRoot.firstChild.remove();
			  }
	
			  tableRoot.appendChild(tableBody);
			}
			const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
			// Display, position, and set styles for font
			tooltipEl.style.opacity = 1;
			tooltipEl.style.backgroundColor = "#fff";
	
			tooltipEl.style.borderRadius = "8px";
			tooltipEl.style.border = "solid";
			tooltipEl.style.borderWidth = "0px";
			tooltipEl.style.borderColor = "#000";
			tooltipEl.style.boxShadow = "1px 1px 5px rgba(0, 0, 0, 0.45)";
			tooltipEl.style.font = tooltip.options.bodyFont.string;
			tooltipEl.style.padding = "8px";
			tooltip.onclick = function () {
			  console.log("test");
			};
	
			if (chart.tooltip.dataPoints[0].dataIndex == 2) {
			  tooltipEl.style.left =
				positionX + tooltip.caretX + tooltip.width / 4 + "px";
			  tooltipEl.style.top =
				positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
			} else if (chart.tooltip.dataPoints[0].dataIndex == 0) {
			  tooltipEl.style.left =
				positionX + tooltip.caretX + tooltip.width / 4 + "px";
			  tooltipEl.style.top =
				positionY + tooltip.caretY - tooltipEl.clientHeight + 10 + "px";
			} else {
			  tooltipEl.style.left =
				positionX + tooltip.caretX + tooltip.width / 4 + "px";
			  tooltipEl.style.top =
				positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
			}
		  };
		  //end
	
		  var changedLabels = [];
		  for (label in newlabelExtractor) {
			let lbl =
			  newlabelExtractor[label] +
			  " " +
			  Math.round((instance.data.newnpvDataExtractor[label] * 100) / instance.data.doughnutGroupVal) +
			  "%";
			changedLabels.push(lbl);
		  }
		  chartData = {
			labels: changedLabels,
			datasets: [
			  {
				data: instance.data.newnpvDataExtractor,
				backgroundColor: doughnutBackgroundColorNEW,
				hoverOffset: 4,
			  },
			],
		  };
		  chartOptions = {
			maintainAspectRatio: false,
			layout: {
			  padding: 10,
			},
			responsive: true,
			onClick: (chart) => {
			  if (
				clickableData.includes(chart.chart.tooltip.dataPoints[0].dataIndex)
			  ) {
				console.log("Trigger event here");
				console.log(chart.chart.tooltip.dataPoints[0].dataIndex);
				//instance.triggerEvent("event_name")
			  }
			},
			cutout: "60%",
			plugins: {
			  title: {
				display: true,
				text: parsedData.title,
				color: "#2A2A2A",
				padding: {
				  top: 3,
				  bottom: 8,
				},
				font: {
				  family: "Jost",
				  size: 18,
				  weight: "bold",
				  lineHeight: 1.2,
				  family: "Jost",
				},
				align: "start",
			  },
			  subtitle: {
				display: true,
				color: "#2A2A2A",
				text: parsedData.subtitle,
				padding: {
				  top: 0,
				  bottom: 20,
				},
				font: {
				  family: "Poppins",
				  size: 12,
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  legend: {
				onClick: function (e) {},
				position: "right",
				display: true,
				labels: {
					usePointStyle: true,
					pointStyle: 'rectRounded',
				  boxWidth: 15,
				  padding: 18,
				},
			  },
			  tooltip: {
				enabled: false,
				position: "nearest",
				external: externalTooltipHandler3,
			  },
			},
		  };
		  chartPlugin = [];
	
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
			  padding: 10,
			},
		  };
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
	
		  for (let i = 0; i < parsedData.data.length; i++) {
			parsedData.data[i].assets.forEach((el) => holdrRNVBubble.push(el.rNPV));
			parsedData.data[i].assets.forEach((el) =>
			  holdPROBABILITYBubble.push(el.probability_of_success)
			);
			parsedData.data[i].assets.forEach((el) => holdIRRBubble.push(el.IRR));
			parsedData.data[i].assets.forEach((el) =>
			  holdYEARSBubble.push(el.years_to_launch)
			);
		  }
	
		  let maxIRRBubble = Math.max(...holdIRRBubble);
		  let maxYEARSBubble = Math.max(...holdYEARSBubble);
		  let minPROBABILITYBubble = Math.min(...holdPROBABILITYBubble);
		  let maxPROBABILITYBubble = Math.max(...holdPROBABILITYBubble);
		  instance.data.maxYEARSBubble = maxYEARSBubble;
	
		  let bubbleColorArr = [
			"rgba(245, 159, 38, 0.2)",
			"rgba(206, 110, 16, 0.2)",
			"rgba(240, 198, 33, 0.2)",
			"rgba(235, 113, 44, 0.2)",
			"rgba(195, 176, 147, 0.2)",
			"rgba(69, 47, 19, 0.2)",
			"rgba(185, 61, 61, 0.2)",
			"rgba(252, 203, 138, 0.2)"
		  ];
		  let bubbleBorderColorArr = [
			"rgba(245, 159, 38, 1)",
			"rgba(206, 110, 16, 1)",
			"rgba(240, 198, 33, 1)",
			"rgba(235, 113, 44, 1)",
			"rgba(235, 153, 37, 1)",
			"rgba(143, 72, 10, 1)",
			"rgba(185, 61, 61, 1)",
			"rgba(252, 203, 138, 1)"
		];

		  if(parsedData?.mode == "blue"){
			bubbleColorArr = [
				"rgba(50, 137, 164, 0.2)",
				"rgba(21, 168, 215, 0.2)",
				"rgba(25, 101, 177, 0.2)",
				"rgba(189, 234, 249, 0.2)",
				"rgba(9, 70, 89, 0.2)",
				"rgba(159, 160, 193, 0.2)",
				"rgba(123, 214, 242, 0.2)",
				"rgba(48, 141, 233, 0.2)"
			  ];
			bubbleBorderColorArr = [
				"rgba(50, 137, 164, 1)",
				"rgba(21, 168, 215, 1)",
				"rgba(25, 101, 177, 1)",
				"rgba(189, 234, 249, 1)",
				"rgba(9, 70, 89, 1)",
				"rgba(159, 160, 193, 1)",
				"rgba(123, 214, 242, 1)",
				"rgba(48, 141, 233, 1)"
			  ];
		  }




	
		  for (let j = 0; j < parsedData.data.length; j++) {
			extractorBubbleTemp = [];
			for (let i = 0; i < parsedData.data[j].assets.length; i++) {
			  let relativeValR = 0;
			  if (parsedData.data[j].assets[i].IRR == maxIRRBubble) {
				relativeValR = largestBubbleValue;
			  } else {
				relativeValR =
				  (largestBubbleValue * parsedData.data[j].assets[i].IRR) /
				  maxIRRBubble;
			  }
			  extractorBubbleTemp.push({
				x: parsedData.data[j].assets[i].years_to_launch,
				y: parsedData.data[j].assets[i].probability_of_success,
				r: relativeValR,
			  });
			}
			extractorBubble.push({
			  label: parsedData.data[j].indication,
			  data: extractorBubbleTemp,
			  backgroundColor: bubbleColorArr[j], //"rgba(252, 203, 138,0.5)",
			  borderColor: bubbleBorderColorArr[j],
			  order: j
			});
		  }
		  if(parsedData?.mode == "withLicensing"){
			extractorBubble[0].backgroundColor = "rgba(255, 173, 64, 0.2)"
			extractorBubble[0].borderColor = "#EF9722"
			extractorBubble[1].backgroundColor = "rgba(123, 214, 242, 0.2)"
			extractorBubble[1].borderColor = "#15A8D7"
			
		  }

		  instance.data.parsedDatafortooltip = parsedData.data;
		  chartData = {
			datasets: extractorBubble,
		  };

		  		  //externalTooltipHandler3
					const getOrCreateTooltip33 = (chart) => {
						let tooltipEl = chart.canvas.parentNode.querySelector("table");
				
						if (!tooltipEl) {
						  tooltipEl = document.createElement("table");
						  tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
						  tooltipEl.style.borderRadius = "8px";
						  tooltipEl.style.color = "white";
						  tooltipEl.style.opacity = 1;
						  tooltipEl.style.pointerEvents = "none";
						  tooltipEl.style.position = "absolute";
						  tooltipEl.style.transform = "translate(-50%, 0)";
						  tooltipEl.style.transition = "all .1s ease";
				
						  const table = document.createElement("table");
						  table.style.margin = "0px";
				
						  tooltipEl.appendChild(table);
						  chart.canvas.parentNode.appendChild(tooltipEl);
						}
			
							return tooltipEl;
					  };
					//   let ies = 1;
				
					  const externalTooltipHandler33 = (context) => {
						// Tooltip Element
					
						const { chart, tooltip } = context;
					
						const tooltipEl = getOrCreateTooltip33(chart);
			
						
						// Hide if no tooltip
						if (tooltip.opacity === 0) {
						  tooltipEl.style.opacity = 0;
						  return;
						}
						// Set Text
						if (tooltip.body) {
						  const bodyLines = tooltip.body.map((b) => b.lines);
				
						  const tableBody = document.createElement("tbody");
            let actualTitle = "undefined";
						 let testthing = 0;
						  bodyLines.forEach((body, i) => {
							//rows
							const tr = document.createElement("tr");
							tr.style.backgroundColor = "inherit";
							tr.style.borderWidth = 0;
							tr.style.whiteSpace = "nowrap";
							const tr2 = document.createElement("tr");
							tr2.style.backgroundColor = "inherit";
							tr2.style.borderWidth = 0;
							tr2.style.whiteSpace = "nowrap";
							const tr3 = document.createElement("tr");
							tr3.style.backgroundColor = "inherit";
							tr3.style.borderWidth = 0;
							tr3.style.whiteSpace = "nowrap";
							const tr4 = document.createElement("tr");
							tr4.style.backgroundColor = "inherit";
							tr4.style.borderWidth = 0;
							tr4.style.whiteSpace = "nowrap";
							const tr5 = document.createElement("tr");
							tr5.style.backgroundColor = "inherit";
							tr5.style.borderWidth = 0;
							tr5.style.whiteSpace = "nowrap";

							//collumns
							const td = document.createElement("td");
							td.classList.add('tdtheme')
							td.style.paddingTop = '5px';
							td.style.fontSize = '14px';
							td.style.fontWeight = '700';
							td.style.color = '#000000';
							td.style.fontFamily = 'Jost';
							const td2 = document.createElement("td");
							td2.classList.add('tdtheme')
							td2.style.fontFamily = 'Poppins';
							td2.style.paddingTop = '8px';
							td2.style.fontWeight = '500';
							const td3 = document.createElement("td");
							td3.classList.add('tdtheme')
							td3.style.fontFamily = 'Poppins';
							td3.style.paddingTop = '5px';
							td3.style.fontWeight = '500';
							const td4 = document.createElement("td");
							td4.classList.add('tdtheme')
							td4.style.fontFamily = 'Poppins';
							td4.style.paddingTop = '5px';
							td4.style.fontWeight = '500';
							const td5 = document.createElement("td");
							td5.classList.add('tdtheme')
							td5.style.fontFamily = 'Poppins';
							td5.style.paddingTop = '5px';
							td5.style.paddingBottom = '5px';
							td5.style.fontWeight = '500';

  
							let text = document.createTextNode(parsedData.data[context.tooltip.dataPoints[i].datasetIndex].assets[context.tooltip.dataPoints[i].dataIndex].label);
							let text2 = document.createTextNode("Value: " + parsedData.data[context.tooltip.dataPoints[i].datasetIndex].assets[context.tooltip.dataPoints[i].dataIndex].rNPV.toFixed(2).replace(/[.,]00$/, "") +parsedData.money);
							let text3 = document.createTextNode("Likelyhood: " + context.tooltip.dataPoints[i].raw.y.toFixed(2).replace(/[.,]00$/, "") + "%");
							let text4 = document.createTextNode("Time to launch: " + context.tooltip.dataPoints[i].raw.x.toFixed(2).replace(/[.,]00$/, ""));
							let text5 = document.createTextNode("IRR: " + (parsedData.data[context.tooltip.dataPoints[i].datasetIndex].assets[context.tooltip.dataPoints[i].dataIndex].IRR*100).toFixed(2).replace(/[.,]00$/, "") + "%");
							
              text = document.createTextNode(parsedData.data[context.tooltip.dataPoints[i].datasetIndex].assets[context.tooltip.dataPoints[i].dataIndex].label);
              text2 = document.createTextNode("Value: " + parsedData.data[context.tooltip.dataPoints[i].datasetIndex].assets[context.tooltip.dataPoints[i].dataIndex].rNPV.toFixed(2).replace(/[.,]00$/, "") +parsedData.money);
              text3 = document.createTextNode("Likelyhood: " + context.tooltip.dataPoints[i].raw.y.toFixed(2).replace(/[.,]00$/, "") + "%");
              text4 = document.createTextNode("Time to launch: " + context.chart.tooltip.dataPoints[0].parsed.x.toFixed(2).replace(/[.,]00$/, ""));
              text5 = document.createTextNode("IRR: " + (parsedData.data[context.tooltip.dataPoints[i].datasetIndex].assets[context.tooltip.dataPoints[i].dataIndex].IRR*100).toFixed(2).replace(/[.,]00$/, "") + "%");

              if(context.tooltip.dataPoints.length > 1){
                if(context.tooltip.dataPoints[0].raw.r < context.tooltip.dataPoints[1].raw.r){
                 text = document.createTextNode(parsedData.data[context.tooltip.dataPoints[0].datasetIndex].assets[context.tooltip.dataPoints[0].dataIndex].label);
                 text2 = document.createTextNode("Value: " + parsedData.data[context.tooltip.dataPoints[0].datasetIndex].assets[context.tooltip.dataPoints[0].dataIndex].rNPV.toFixed(2).replace(/[.,]00$/, "") +parsedData.money);
                 text3 = document.createTextNode("Likelyhood: " + context.tooltip.dataPoints[0].raw.y.toFixed(2).replace(/[.,]00$/, "") + "%");
                 text4 = document.createTextNode("Time to launch: " + context.chart.tooltip.dataPoints[0].parsed.x.toFixed(2).replace(/[.,]00$/, ""));
                 text5 = document.createTextNode("IRR: " + (parsedData.data[context.tooltip.dataPoints[0].datasetIndex].assets[context.tooltip.dataPoints[0].dataIndex].IRR*100).toFixed(2).replace(/[.,]00$/, "") + "%");
               }  
               }

              if(parsedData.mode == "withLicensing"){
                  text = document.createTextNode(parsedData.data[i].assets[context.tooltip.dataPoints[i].dataIndex].label);
                  text2 = document.createTextNode("Value: " + parsedData.data[i].assets[context.tooltip.dataPoints[i].dataIndex].rNPV.toFixed(2).replace(/[.,]00$/, "") +parsedData.money);
                  text3 = document.createTextNode("Likelyhood: " + parsedData.data[i].assets[context.tooltip.dataPoints[i].dataIndex].probability_of_success.toFixed(2).replace(/[.,]00$/, "") + "%"); //context.tooltip.dataPoints[i].raw.y.toFixed(2).replace(/[.,]00$/, "") + "%");
                  text4 = document.createTextNode("Time to launch: " +   parsedData.data[i].assets[context.tooltip.dataPoints[i].dataIndex].years_to_launch.toFixed(2).replace(/[.,]00$/, ""));  //context.tooltip.dataPoints[i].raw.x.toFixed(2).replace(/[.,]00$/, ""));
                  text5 = document.createTextNode("IRR: " + (parsedData.data[i].assets[context.tooltip.dataPoints[i].dataIndex].IRR*100).toFixed(2).replace(/[.,]00$/, "") + "%");
                }

              td.appendChild(text);
							td2.appendChild(text2);
							td3.appendChild(text3);
							td4.appendChild(text4);
							td5.appendChild(text5);
								tr.appendChild(td);
								tr2.appendChild(td2);
								tr3.appendChild(td3);
								tr4.appendChild(td4);
								tr5.appendChild(td5);
					
							tableBody.appendChild(tr);
							tableBody.appendChild(tr2);
							tableBody.appendChild(tr3);
							tableBody.appendChild(tr4);
							tableBody.appendChild(tr5);
							testthing = i;
						  });
							
						  const tableRoot = tooltipEl.querySelector("table");
						  tableRoot.style.backgroundColor = "#fff";
						  tableRoot.style.opacity = 1;
						  tableRoot.style.borderRadius = "10px";
						  tableRoot.style.border = "solid";
						  tableRoot.style.borderWidth = "0px";
						  tableRoot.style.borderColor = "#000";
						  // Remove old children
        
						  while (tableRoot.firstChild) {
							tableRoot.firstChild.remove();
						  }
							tableRoot.appendChild(tableBody);
							if(testthing > 0){
            for(let temp = 0; temp < testthing; temp++){
              for(let i =0;i<5;i++){
								tableBody.removeChild(tableBody.children[temp])
							}
            }
            // tableBody.children[0].children[0].innerHTML = actualTitle;
						}	
						 
						}
						const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
						// Display, position, and set styles for font
						tooltipEl.style.opacity = 1;
						tooltipEl.style.backgroundColor = "#fff";
				
						tooltipEl.style.borderRadius = "8px";
						tooltipEl.style.border = "solid";
						tooltipEl.style.borderWidth = "0px";
						tooltipEl.style.borderColor = "#000";
						tooltipEl.style.boxShadow = "1px 1px 5px rgba(0, 0, 0, 0.45)";
						tooltipEl.style.font = tooltip.options.bodyFont.string;
						tooltipEl.style.padding = "8px";
						tooltipEl.style.left = positionX + tooltip.caretX + tooltip.width / 4 + "px";
						tooltipEl.style.top = positionY + tooltip.caretY - tooltipEl.clientHeight + "px";
					  };
					  //end




		  chartOptions = {
			maintainAspectRatio: false,
			responsive: true,
			layout: {
			  padding: 10,
			},
			borderWidth: 1,
			scales: {
			  y: {
				afterDataLimits: function (axis) {
				  if (minPROBABILITYBubble <= 25) {
					axis.min -= 25 - minPROBABILITYBubble; // add 1px to bottom
				  }
				  if (maxPROBABILITYBubble >= 75) {
					let sum = 100 - maxPROBABILITYBubble;
					axis.max += 25 - sum; // add 1px to top
				  }
				},
				title: {
				  display: true,
				  text: "Probability of success %",
				  color: "#2A2A2A",
				  align: "center",
				  font: {
					size: 13,
					family: "Poppins",
				  },
				},
				max: 100,
				beginAtZero: true,
				ticks: {
				  stepSize: 10,
				  callback: function (value, index, values) {
					return value < 0 || value > 100 ? "" : value;
				  },
				},
				grid: {
				  display: true,
				  borderDash: [2, 2],
				},
			  },
			  x: {
				title: {
				  display: true,
				  text: "Time to launch (years)",
				  align: "center",
				  color: "#2A2A2A",
				  font: {
					size: 13,
					family: "Poppins",
				  },
				},
				ticks: {
				  stepSize: 1,
				  callback: function (value, index, values) {
					return value < 0 ? "" : value;
				  },
				},
				min: -2,
				max: maxYEARSBubble + 2,
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
				  usePointStyle: true,
				  pointStyle: "rectRounded",
				  padding: 20,
				  boxWidth: 16,
				  boxHeight: 16,
				},
			  },
			  tooltip: {
				enabled: false,
				position: "nearest",
				external: externalTooltipHandler33,
			  },

				// callbacks: {
				//   title: function (context) {
				// 	if(context.length >1){
				// 		let rarr = [];
				// 		for(let i = 0; i<context.length;i++){
				// 			rarr.push(context[i].raw.r)
				// 		}
				// 		let idntf = Math.min(...rarr);
				// 		let indexR = rarr.indexOf(idntf);
					
				// 		return instance.data.parsedDatafortooltip[
				// 			context[indexR].datasetIndex
				// 		  ].assets[context[indexR].dataIndex].label;
				// 	}
				// 	return instance.data.parsedDatafortooltip[
				// 	  context[0].datasetIndex
				// 	].assets[context[0].dataIndex].label;
				//   },
				//   label: function (context) {
				// 	return ""
				//   },
				//   footer: function (context) {
				// 	if(context.length >1){

				// 		let rarr = [];
				// 		for(let i = 0; i<context.length;i++){
				// 			rarr.push(context[i].raw.r)
				// 		}
				// 		let idntf = Math.min(...rarr);
				// 		let indexR = rarr.indexOf(idntf);


				// 	return `Value: ${instance.data.parsedDatafortooltip[
				// 		context[indexR].datasetIndex
				// 	  ].assets[context[indexR].dataIndex].rNPV.toFixed(2)} ${money}${
				// 		parsedData.money
				// 	  }\nLikelyhood: ${context[indexR].dataset.data[
				// 		context[indexR].dataIndex
				// 	  ].y.toFixed()}%\nTime to launch: ${
				// 		context[indexR].dataset.data[context[indexR].dataIndex].x
				// 	  }\nIRR: ${(
				// 		instance.data.parsedDatafortooltip[context[indexR].datasetIndex]
				// 		  .assets[context[indexR].dataIndex].IRR * 100
				// 	  )
				// 		.toFixed(2)
				// 		.replace(/[.,]00$/, "")}%`
				// 	}


				// 	return `Value: ${instance.data.parsedDatafortooltip[
				// 	  context[0].datasetIndex
				// 	].assets[context[0].dataIndex].rNPV.toFixed(2)} ${money}${
				// 	  parsedData.money
				// 	}\nLikelyhood: ${context[0].dataset.data[
				// 	  context[0].dataIndex
				// 	].y.toFixed()}%\nTime to launch: ${
				// 	  context[0].dataset.data[context[0].dataIndex].x
				// 	}\nIRR: ${(
				// 	  instance.data.parsedDatafortooltip[context[0].datasetIndex]
				// 		.assets[context[0].dataIndex].IRR * 100
				// 	)
				// 	  .toFixed(2)
				// 	  .replace(/[.,]00$/, "")}%`;
				//   },
				// },
			  title: {
				display: true,
				text: "IRR (Internal Rate of Return)",
				padding: {
				  top: 20,
				  bottom: 0,
				},
				color: "#2A2A2A",
				font: {
				  family: "Jost",
				  size: 18,
				  weight: "bold",
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			  subtitle: {
				display: true,
				color: "#2A2A2A",
				text: "Size of the bubble represents the asset’s IRR",
				color: "#5B5B5B",
				padding: {
				  top: 0,
				  bottom: 20,
				},
				font: {
				  family: "Poppins",
				  size: 12,
				  lineHeight: 1.2,
				},
				align: "start",
			  },
			},
		  };
	
		  if (instanceContainer.clientWidth <= 478) {
			chartOptions.scales.x.min = -2;
			chartOptions.scales.x.max = 2;
		  }
	
		  let xieeq = {
			afterDatasetDraw: (c) => {
					let datasets = c.data.datasets;
					datasets.forEach((e, i) => {
					  //let isHidden = e._meta[0].hidden;
					  let isHidden = e.data._chartjs.listeners[0]._cachedMeta.hidden;
					  if (!isHidden) {
						let data = c.getDatasetMeta(i).data;
						data.forEach((e) => {
						  let ctx = c.ctx;
						  let x = e.x;
						  let y = e.y;
						  ctx.fillStyle = e.options.borderColor
						  if(e.options.borderColor == "#EF9722"){
							  ctx.fillStyle = "#EF9722"
						  }else
						  if(e.options.borderColor == "#15A8D7"){
							ctx.fillStyle = "rgba(21, 168, 215, 1)";
						  }else
						  if(e.options.borderColor == "rgba(245, 159, 38, 1)"){
							ctx.fillStyle = "rgba(245, 159, 38, 1)";
						  }else
						  if(e.options.borderColor == "rgba(206, 110, 16, 1)"){
							ctx.fillStyle = "rgba(206, 110, 16, 1)";
						  }else
						  if(e.options.borderColor == "rgba(240, 198, 33, 1)"){
							ctx.fillStyle = "rgba(240, 198, 33, 1)";
						  }else
						  if(e.options.borderColor == "rgba(235, 113, 44, 1)"){
							  ctx.fillStyle = "rgba(235, 113, 44, 1)";
						  }else
						  if(e.options.borderColor == "rgba(235, 153, 37, 1)"){
							  ctx.fillStyle = "rgba(235, 153, 37, 1)";
						  }else
						  if(e.options.borderColor == "rgba(143, 72, 10, 1)"){
							  ctx.fillStyle = "rgba(143, 72, 10, 1)";
						  }else
						  if(e.options.borderColor == "rgba(185, 61, 61, 1)"){
							  ctx.fillStyle = "rgba(185, 61, 61, 1)";
						  }else
						  if(e.options.borderColor == "rgba(252, 203, 138, 1)"){
							  ctx.fillStyle = "rgba(252, 203, 138, 1)";
						  }else
						  if(e.options.borderColor == "rgba(50, 137, 164, 1)"){
							  ctx.fillStyle = "rgba(50, 137, 164, 1)";
						  }else
						  if(e.options.borderColor == "rgba(21, 168, 215, 1)"){
							  ctx.fillStyle = "rgba(21, 168, 215, 1)";
						  }else
						  if(e.options.borderColor == "rgba(25, 101, 177, 1)"){
							  ctx.fillStyle = "rgba(25, 101, 177, 1)";
						  }else
						  if(e.options.borderColor == "rgba(189, 234, 249, 1)"){
							  ctx.fillStyle = "rgba(189, 234, 249, 1)";
						  }else
						  if(e.options.borderColor == "rgba(9, 70, 89, 1)"){
							  ctx.fillStyle = "rgba(9, 70, 89, 1)";
						  }else
						  if(e.options.borderColor == "rgba(159, 160, 193, 1)"){
							  ctx.fillStyle = "rgba(159, 160, 193, 1)";
						  }else
						  if(e.options.borderColor == "rgba(123, 214, 242, 1)"){
							  ctx.fillStyle = "rgba(123, 214, 242, 1)";
						  }else
						  if(e.options.borderColor == "rgba(48, 141, 233, 1)"){
							  ctx.fillStyle = "rgba(48, 141, 233, 1)";
						  }
						  ctx.fillRect(x - 1, y - 7, 2, 14);
						  ctx.fillRect(x - 7, y - 1, 14, 2);
						  ctx.restore();

						});
					  }
					});

			},
		  };

		  let xoassss;

		  chartPlugin.push(xieeq);

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
			  padding: 10,
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
			for (let j = 0; j < parsedData.data[0].length; j++) {
			  parsedDataset1NPV.push(parsedData.data[0][j].NPV);
			  parsedDataset1rNPV.push(parsedData.data[0][j].rNPV);
			  parsedDatasetLabels.push(parsedData.data[0][j].date);
			}
			parsedDataset1NPVMain.push(parsedDataset1NPV);
			instance.data.parsedDataset1rNPVMain.push(parsedDataset1rNPV);
			parsedDataset1rNPVMain = instance.data.parsedDataset1rNPVMain;
			//find specials
	  
			var mainDateQuarters2e = [];
			let fullYears2e = [];
			for (let i = 0; i < parsedDatasetLabels.length; i++) {
			  let data = parsedDatasetLabels[i].substring(0, 4);
			  if (!fullYears2e.includes(data)) {
				fullYears2e.push(data);
			  }
			}
	  
			let datasetsGroupedo2NPVnew = [];
			var datasetsGroupedoMain2e = [];
			let datasetsGroupedminiO1 = [];
			let datasetsGroupedminiO1NPV = [];
			let datasetsGroupedo2 = {};
			
			for (let i = 0; i < fullYears2e.length; i++) {
			  let q1sum = 0;
			  let q2sum = 0;
			  let q3sum = 0;
			  let q4sum = 0;
			  let q1sumNPV = 0;
			  let q2sumNPV = 0;
			  let q3sumNPV = 0;
			  let q4sumNPV = 0;
			  datasetsGroupedo2 = {};
			  for (let e = 0; e < parsedData.data[0].length; e++) {
				if (parsedData.data[0][e].date.includes(fullYears2e[i])) {
				  let date2 = parsedData.data[0][e].date;
				  let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
	  
				  if (parsedData.data[0][e].special == 1) {
					instance.data.specialOldDate = parsedData.data[0][e].date;
					let dateF = parsedData.data[0][e].date;
					let quarter = Math.floor(new Date(dateF).getMonth() / 3 + 1);
					specialOld = fullYears2e[i] + " Q" + quarter;
				  } else if (parsedData.data[0][e].special == 2) {
					instance.data.specialNewDate = parsedData.data[0][e].date;

					let dateF = parsedData.data[0][e].date;
					let quarter = Math.floor(new Date(dateF).getMonth() / 3 + 1);
					specialNew = fullYears2e[i] + " Q" + quarter;
				  }
	  
				  if (quarter == 1) {
					q1sumNPV += parsedData.data[0][e].NPV;
					q1sum += parsedData.data[0][e].rNPV;
				  } else if (quarter == 2) {
					q2sumNPV += parsedData.data[0][e].NPV;
					q2sum += parsedData.data[0][e].rNPV;
				  } else if (quarter == 3) {
					q3sumNPV += parsedData.data[0][e].NPV;
					q3sum += parsedData.data[0][e].rNPV;
				  } else if (quarter == 4) {
					q4sumNPV += parsedData.data[0][e].NPV;
					q4sum += parsedData.data[0][e].rNPV;
				  }
				}
			  }
			  let dt1 = fullYears2e[i] + " Q1";
			  let dt2 = fullYears2e[i] + " Q2";
			  let dt3 = fullYears2e[i] + " Q3";
			  let dt4 = fullYears2e[i] + " Q4";
	  
			  mainDateQuarters2e.push(dt1);
			  mainDateQuarters2e.push(dt2);
			  mainDateQuarters2e.push(dt3);
			  mainDateQuarters2e.push(dt4);
			  datasetsGroupedminiO1.push(q1sum);
			  datasetsGroupedminiO1.push(q2sum);
			  datasetsGroupedminiO1.push(q3sum);
			  datasetsGroupedminiO1.push(q4sum);
			  datasetsGroupedminiO1NPV.push(q1sumNPV);
			  datasetsGroupedminiO1NPV.push(q2sumNPV);
			  datasetsGroupedminiO1NPV.push(q3sumNPV);
			  datasetsGroupedminiO1NPV.push(q4sumNPV);
			}
			let specialOldIndexYear = "";
			let specialNewIndexYear = "";


			for (let i = 0; i < mainDateQuarters2e.length; i++) {
			  if (mainDateQuarters2e[i] == specialOld) {
				specialOldIndex = i;
				instance.data.oldIndex = specialOldIndex;
				instance.data.specialOldIndexYear = mainDateQuarters2e[i].substring(0, 4);
				instance.data.specialOldIndexQ = mainDateQuarters2e[i];
			  } else if (mainDateQuarters2e[i] == specialNew) {
				specialNewIndex = i;
				instance.data.newIndex = specialNewIndex;
				instance.data.specialNewIndexYear = mainDateQuarters2e[i].substring(0, 4);
				instance.data.specialNewIndexQ = mainDateQuarters2e[i];
			}
			}
			
			if(parsedData.mode == "latest"){
				//find all duplicates in array
				let valArr2a = [];
				let valArr2aMax = [];
				let tt12312 = false;
				for (let i = 0; i < parsedData.data[0].length; i++) {
				  for (let j = i + 1; j < parsedData.data[0].length; j++) {
					if (parsedData.data[0][i].date == parsedData.data[0][j].date) {
					  valArr2aMax.push(i);
					  let ez = new Date(parsedData.data[0][i].created).getTime();
					  let ze = new Date(parsedData.data[0][j].created).getTime();
					  if (ez < ze) {
						valArr2a.push(i);
					  } else {
						valArr2a.push(j);
					  }
					}
				  }
				}
			  
				let valArr2aUNIQUE = [...new Set(valArr2a)];
				for (let i = 0; i < valArr2aUNIQUE.length; i++) {
				  parsedData.data[0][valArr2aUNIQUE[i]] = "";
				}
			  
				for (let i = parsedData.data[0].length; i > 0; i--) {
				  let val = parsedData.data[0][i];
				}
				const parsedDataRemovedEmpt = parsedData.data[0].filter((str) => str !== '');
				
				parsedData.data[0] = parsedDataRemovedEmpt;
			
				}

				parsedData.data[0].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // b - a for reverse sort
				let fullYears2magn = [];
				for (let i = 0; i < parsedData.data[0].length; i++) {
				  let data = parsedData.data[0][i].date.substring(0, 4);
				  if (!fullYears2magn.includes(data)) {
					fullYears2magn.push(data);
				  }
				}
			
			
				let YearsEn = [];
				for (let a = 0; a < fullYears2magn.length; a++) {
				  let latestQ1 = [];
				  let latestQ2 = [];
				  let latestQ3 = [];
				  let latestQ4 = [];
				  for (let i = 0; i < parsedData.data[0].length; i++) {
					let date2 = parsedData.data[0][i].date;
					let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
					if (date2.includes(fullYears2magn[a])) {
					  let labelp1 = parsedData.data[0][i].date.substring(0, 4);
					  let labelp2 = "NA";
					  let label = "NA";
					  if (quarter == 1) {
						labelp2 = "Q1";
						latestQ1.push(parsedData.data[0][i]);
					  } else if (quarter == 2) {
						labelp2 = "Q2";
						latestQ2.push(parsedData.data[0][i]);
					  } else if (quarter == 3) {
						labelp2 = "Q3";
						latestQ3.push(parsedData.data[0][i]);
					  } else if (quarter == 4) {
						labelp2 = "Q4";
						latestQ4.push(parsedData.data[0][i]);
					  }
					}
				  }
				  YearsEn.push(latestQ1);
				  YearsEn.push(latestQ2);
				  YearsEn.push(latestQ3);
				  YearsEn.push(latestQ4);
				}
			
				let magicLabelsn = [];
				let magicValuesn = [];
				for (let a = 0; a < YearsEn.length; a++) {
				  let lastElement = YearsEn[a].pop();
				  if (lastElement == undefined) {
					continue;
				  }
				  let date1 = lastElement.date.substring(0, 4);
				  let date2 = lastElement.date;
				  let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
				  let value = lastElement.rNPV;
				  magicLabelsn.push(date1 + " Q" + quarter);
				  magicValuesn.push(value);
				}
				
		


			datasetsGroupedo2 = {
			  data: datasetsGroupedminiO1,
			  fill: false,
			  borderColor: function (context) {

				var index = context.dataIndex;
				var value = context.dataset.data[index];
				if (index == specialOldIndex) {
				  return "#7BD6F2";
				} else if (index == specialNewIndex) {
				  return "rgba(245, 159, 38, 1)";
				} else {
				  return "#F59F26";
				}
			  },
			  backgroundColor: function (context) {
				var index = context.dataIndex;
				var value = context.dataset.data[index];
				if (index == specialOldIndex) {
				  return "#7BD6F2";
				} else if (index == specialNewIndex) {
				  return "rgba(245, 159, 38, 1)";
				} else {
				  return "rgba(255, 255, 255, 1)";
				}
			  },
			  stepped: false,
			  tension: 0.2,
			  radius: 4,
			  borderWidth: 3.5,
			};
			datasetsGroupedoMain2e.push(datasetsGroupedo2);
			datasetsGroupedo2NPVnew.push(datasetsGroupedminiO1NPV);
			instance.data.parsedDatasetLabels = parsedDatasetLabels;

			if(parsedData.mode == "latest" ){
				mainDateQuarters2e = magicLabelsn;
				datasetsGroupedoMain2e[0].data = magicValuesn;
			  }
			  if(parsedData.mode == "pipeline"){
				
				
			  }
			  let specialOldIndexPipe = -10;
			  let specialNewIndexPipe = -10;


			  if(parsedData.mode == "pipeline"){
				for(let i = 0; i< parsedData.data[0].length;i++){
					if(parsedData.data[0][i].special == 1){
						specialOldIndexPipe = i
					}else if(parsedData.data[0][i].special == 2){
						specialNewIndexPipe = i
					}
				}
			}
			let zxo1;
			let exo1;
			if(parsedData.mode == "pipeline"){

				let yearsPipe = [];
				let dataPipe = [];
					for (let i = 0; i < parsedData.data[0].length; i++) {
						dataPipe.push(parsedData.data[0][i].rNPV)
					  let date2 = parsedData.data[0][i].date;
					  let quarter = Math.floor(new Date(date2).getMonth() / 3 + 1);
						let labelp1 = parsedData.data[0][i].date.substring(0, 4);
						if (quarter == 1) {
						  labelp2 = "Q1";
						  yearsPipe.push(labelp1 + " " + labelp2)
						} else if (quarter == 2) {
						  labelp2 = "Q2";
						  yearsPipe.push(labelp1 + " " + labelp2)
						} else if (quarter == 3) {
						  labelp2 = "Q3";
						  yearsPipe.push(labelp1 + " " + labelp2)
						} else if (quarter == 4) {
						  labelp2 = "Q4";
						  yearsPipe.push(labelp1 + " " + labelp2)
						}
					}
					mainDateQuarters2e = yearsPipe;
					datasetsGroupedoMain2e[0].data = dataPipe;
		
					exo1 = function (context) {
					  var index = context.dataIndex;
					  if (index == specialOldIndexPipe) {
						return "#7BD6F2";
					  } else if (index == specialNewIndexPipe) {
						return "rgba(245, 159, 38, 1)";
					  } else {
						return "#F59F26";
					  }
					}
		  
					zxo1 = function (context) {
					  var index = context.dataIndex;
					  if (index == specialOldIndexPipe) {
						return "#7BD6F2";
					  } else if (index  == specialNewIndexPipe) {
						return "rgba(245, 159, 38, 1)";
					  } else {
						return "rgba(255, 255, 255, 1)";
					  }
				  }

			}

			  for (let i = 0; i < mainDateQuarters2e.length; i++) {
				if (mainDateQuarters2e[i] == specialOld) {
				  specialOldIndex = i;
				  instance.data.oldIndex = specialOldIndex;
				  instance.data.specialOldIndexYear = mainDateQuarters2e[i].substring(0, 4);
				  instance.data.specialOldIndexQ = mainDateQuarters2e[i];
				} else if (mainDateQuarters2e[i] == specialNew) {
				  specialNewIndex = i;
				  instance.data.newIndex = specialNewIndex;
				  instance.data.specialNewIndexYear = mainDateQuarters2e[i].substring(0, 4);
				  instance.data.specialNewIndexQ = mainDateQuarters2e[i];
			  }
			  }



			chartData = {
			  labels: mainDateQuarters2e,
			  datasets: datasetsGroupedoMain2e,
			};

			if(parsedData.mode == "pipeline"){
			chartData.datasets[0].borderColor = exo1
			chartData.datasets[0].backgroundColor = zxo1
			}
		
			instance.data.mainDateQuarters2e = mainDateQuarters2e;
			var line2DataSetOrg = [];
			for (let i = 0; i < datasetsGroupedoMain2e.length; i++) {
			  let orgDatasetLine = datasetsGroupedoMain2e[i].data.map((x) => x);
			  instance.data.line2DataSetOrg.push(orgDatasetLine)
			}
	  
			var yearorquarterhandler = 0;
	  
			const getOrCreateTooltipnew = (chart) => {
			  let tooltipEl = chart.canvas.parentNode.querySelector("div");
	  
			  if (!tooltipEl) {
				tooltipEl = document.createElement("div");
				chart.canvas.parentNode.appendChild(tooltipEl);
				tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
				tooltipEl.style.borderRadius = "8px";
				tooltipEl.style.color = "white";
				tooltipEl.style.opacity = 1;
				tooltipEl.style.position = "absolute";
				tooltipEl.style.transform = "translate(-50%, 0)";
				tooltipEl.style.transition = "all .1s ease";
	  
				const table = document.createElement("table");
				table.style.margin = "0px";
				tooltipEl.appendChild(table);
			  }
			  return tooltipEl;
			};
			line2DataSetOrg = instance.data.line2DataSetOrg;
			var npvMain = [];
			var rnpvMain = [];
			var newDataSet1ForTooltip = [];
			var newDataSet2ForTooltip = [];
			var newDataSet1ForTooltipr = [];
			var newDataSet2ForTooltipr = [];
			const externalTooltipHandlernew = (context) => {
			  // Tooltip Element
			  if (
				!(context.chart.tooltip.dataPoints[0].dataIndex == instance.data.newIndex) &&
				!(context.chart.tooltip.dataPoints[0].dataIndex == instance.data.oldIndex )
			  ) {
				return;
			  }
			  var extTimer = 1;
			  const { chart, tooltip } = context;
			  const tooltipEl = getOrCreateTooltipnew(chart);
	  
			  // Set Text
			  if (tooltip.body) {
				//testInstancenew = 0;
				const bodyLines = tooltip.body.map((b) => b.lines);
	  
				const tableBody = document.createElement("tbody");
				bodyLines.forEach((body, i) => {
				  //rows
				  const tr0 = document.createElement("tr");
				  tr0.style.backgroundColor = "inherit";
				  tr0.style.borderWidth = 0;
				  tr0.style.whiteSpace = "nowrap";
	  
				  const tr = document.createElement("tr");
				  const tr2 = document.createElement("tr");
				  const tr3 = document.createElement("tr");
				  //collumns
				  const td0 = document.createElement("td");
				  td0.style.borderWidth = 0;
				  td0.style.color = "#000";
				  td0.style.whiteSpace = "nowrap";
				  td0.style.fontSize = "12px";
				  td0.style.paddingBottom = "3px";
				  const td = document.createElement("td");
				  td.style.borderWidth = 0;
				  td.style.color = "#000";
				  td.style.whiteSpace = "nowrap";
				  td.style.fontSize = "12px";
				  td.style.paddingBottom = "3px";
	  
				  const td2 = document.createElement("td");
				  td2.style.borderWidth = 0;
				  td2.style.fontSize = "12px";
				  td2.style.color = "#000";
				  td2.style.textAlign = "right";
				  td2.style.whiteSpace = "nowrap";
				  td2.style.paddingTop = "3px";
				  const td3 = document.createElement("td");
				  td3.style.borderWidth = 0;
				  td3.style.fontSize = "12px";
				  td3.style.color = "#000";
				  td3.style.textAlign = "right";
				  td3.style.whiteSpace = "nowrap";
				  td3.style.paddingTop = "3px";
				  const td4 = document.createElement("td");
				  td4.style.borderWidth = 0;
				  td4.style.whiteSpace = "nowrap";
				  td4.style.fontSize = "12px";
				  td4.style.color = "#000";
				  td4.style.padding = "3px";
				  const tdbtn = document.createElement("button");
				  tdbtn.onclick = function () {
					console.log("IT WAS CLICKED");
				  };
				  tdbtn.style.position = "relative";
				  tdbtn.style.marginTop = "4px";
				  tdbtn.style.borderWidth = "1px";
				  tdbtn.style.border = "solid";
				  tdbtn.style.borderColor = "#F59F26";
				  tdbtn.style.borderRadius = "5px";
	  
				  tdbtn.style.height = "40px";
				  tdbtn.style.fontSize = "12px";
				  tdbtn.style.whiteSpace = "nowrap";
				  tdbtn.style.padding = "3px";
				 tdbtn.style.width = "135px";
	  
				  var tdbtnvert = document.createElement("div");
				  tdbtnvert.style.margin = "0";
				  tdbtnvert.style.position = "absolute";
				  tdbtnvert.style.top = "50%";
				  tdbtnvert.style.transform = "translateY(-50%)";
				  tdbtn.style.display = "block";
				  tdbtn.style.fontFamily = "Jost";
				  tdbtn.style.fontWeight = "600";
				  tdbtn.style.fontSize = "16px";
				  tdbtn.style.verticalAlign = "bottom";
				  tdbtn.style.backgroundColor = "#fff";
				  tdbtnvert.style.left = "50%";
				  tdbtnvert.style.top = "50%";
				  tdbtnvert.style.transform = "translate(-50%, -50%)";
				  tdbtnvert.style.backgroundColor = "#fff";
	  
				  //fonts
				  td0.style.fontFamily = "Poppins";
				  td.style.fontFamily = "Poppins";
				  td2.style.fontFamily = "Poppins";
				  td3.style.fontFamily = "Poppins";
				  td0.style.fontWeight = "600";
				  td2.style.fontWeight = "600";
				  td.style.fontWeight = "500";
				  td3.style.fontWeight = "500";
	  
				  var resE = 0;
				  npvMain = [];
				  rnpvMain = [];
				  if (yearorquarterhandler != 2) {
					if (chart.tooltip.dataPoints[0].datasetIndex == 0) {
					  rnpvMain = datasetsGroupedoMain2e[0].data;
					  npvMain = datasetsGroupedoMain2e[0].data;
					} else {
					  npvMain = datasetsGroupedoMain2e[0].data;
					  rnpvMain = datasetsGroupedoMain2e[1].data;
					}
				  } else {
					if (chart.tooltip.dataPoints[0].datasetIndex == 0) {
					  npvMain = newDataSet1ForTooltip;
					  rnpvMain = newDataSet1ForTooltipr;
					} else {
					  npvMain = newDataSet2ForTooltip;
					  rnpvMain = newDataSet2ForTooltipr;
					}
				  }
	  
				  resE = rnpvMain[chart.tooltip.dataPoints[0].dataIndex]
					.toFixed(2)
					.replace(/[.,]00$/, "");
	  
				  let res = "";
				  let resTemp = 0;
				  if (chart.tooltip.dataPoints[0].dataIndex >= 1) {
					res = rnpvMain[instance.data.newIndex] - rnpvMain[instance.data.newIndex];
					//}
				  } else {
					resTemp = rnpvMain[chart.tooltip.dataPoints[0].dataIndex];
					res = resTemp;
				  }
				  let resF = "";
				  if (resTemp > 0) {
					td3.style.color = "#71B560";
					resF = "↗ " + res;
				  } else {
					td3.style.color = "#e04f4f";
					resF = "↙ " + res;
				  }
	  
				  let iconDiv = document.createElement("div");
				  iconDiv.style.height = "10px";
				  iconDiv.style.width = "10px";
				  iconDiv.style.marginLeft = "5px";
				  iconDiv.style.display = "inline-block";
				  iconDiv.style.borderRadius = "2px";
				  iconDiv.style.backgroundColor =
				  chart.tooltip.labelColors[0].borderColor;
		
				  //builder
				  let textCspec = document.createElement("span");
				  const text0 = document.createTextNode("rNPV ");
				  const text = document.createTextNode(
					" " + resE + " " + parsedData.money
				  );
				  const text2 = document.createTextNode("rNPV △");
				  const text3 = document.createTextNode(
					resF + " " + parsedData.money
				  );
				  td0.colSpan = 1;
				  td.colSpan = 1;
				  td2.colSpan = 1;
				  td3.colSpan = 1;
				  td4.colSpan = 2;
				  textCspec.appendChild(text0)
				  textCspec.style.left = "10px";

				//   td0.style.colSpan = 1;
				//   td.style.colSpan = 1;
				//   td2.style.colSpan = 1;
				//   td3.style.colSpan = 1 ;
				//   td4.style.colSpan = 2;

				  td0.appendChild(textCspec);
				  td0.appendChild(iconDiv);
				  td.appendChild(text);
	  
				  td2.appendChild(text2);
				  td3.appendChild(text3);
				  td.style.textAlign = "right";
				  td3.style.textAlign = "right";
				  td2.style.textAlign = "left";
				  td0.style.textAlign = "left";

				  td0.style.width = "50%";
				  td.style.width = "50%";
				  td2.style.width = "50%";
				  td3.style.width = "50%";

				  tr0.appendChild(td0);
				  tr0.appendChild(td);
				  tr2.appendChild(td2);
				  tr2.appendChild(td3);

				
				  let text22 = document.createTextNode("View Inputs  →"); //"View Inputs  →"
				  tdbtn.appendChild(tdbtnvert);
				  tdbtnvert.appendChild(text22);
				  td4.appendChild(tdbtn);
				  tr3.appendChild(td4);
				  if (chartData.datasets.length > 1) {
					if (
					  chartData.datasets[0].data[
						chart.tooltip.dataPoints[0].dataIndex
					  ] ==
					  chartData.datasets[1].data[
						chart.tooltip.dataPoints[0].dataIndex
					  ]
					) {
					  tdbtn.style.display = "none";
					}
				  }
				  tableBody.appendChild(tr0);
				//   tableBody.appendChild(tr);
				  tableBody.appendChild(tr2);
				//   tableBody.appendChild(tr3);
				  tableBody.appendChild(tr3);
				});
	  
				var tableRoot = tooltipEl.querySelector("table");
				tableRoot.style.backgroundColor = "#fff";
				tableRoot.style.opacity = 1;
				tableRoot.style.borderRadius = "2px";
				tableRoot.style.border = "solid";
				tableRoot.style.borderWidth = "0px";
				tableRoot.style.borderColor = "#000";
	  
				// Remove old children
				while (tableRoot.firstChild) {
				  tableRoot.firstChild.remove();
				}
			
				// Add new children
				if (
				  chart.tooltip.dataPoints[0].dataIndex == instance.data.newIndex  ||
				  chart.tooltip.dataPoints[0].dataIndex == instance.data.oldIndex 
				) {
				  tableRoot.appendChild(tableBody);
				}
			  }
			  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
	  
			  // Display, position, and set styles for font
			  tooltipEl.style.opacity = 1;
			  tooltipEl.style.display = "block";
			  tooltipEl.style.backgroundColor = "#fff";
			  tooltipEl.style.borderRadius = "8px";
			  tooltipEl.style.border = "solid";
			  tooltipEl.style.borderWidth = "0px";
			  tooltipEl.style.borderColor = "#000";
			  tooltipEl.style.boxShadow = "1px 1px 5px black";
			  tooltipEl.style.font = tooltip.options.bodyFont.string;
			  tooltipEl.style.padding = "8px";
			  var extJAYCY = 0;
			  var extJAYCYent = 0;
			  tooltipEl.addEventListener("mouseover", (e) => {
				//  testInstancenew = 0;
	  
				extJAYCYent = 1;
				if (extJAYCY != 2) {
				  tooltipEl.style.display = "block";
				  tooltipEl.style.opacity = 1;
				}
			  });
			  // Hide if no tooltip
			  if (tooltip.opacity === 0) {
				setTimeout(function () {
				  if (extJAYCYent == 0) {
					tooltipEl.style.display = "none";
				  }
				}, 200);
				return;
			  }
	  
			  tooltipEl.addEventListener("mouseleave", (e) => {
				//testInstancenew = 0;
	  
				tooltipEl.style.display = "none";
				tooltipEl.style.opacity = 0;
				extJAYCY = 2;
			  });
	  
			  if (tooltipEl.clientHeight + tooltip.caretY + 6 < chart.height) {
				if (parsedData.data.length == 1) {
				  tooltipEl.style.left = positionX + tooltip.caretX + 45 + "px";
				  tooltipEl.style.top = positionY + tooltip.caretY + 4 + "px";
				} else {
				  tooltipEl.style.left = positionX + tooltip.caretX + 70 + "px";
				  tooltipEl.style.top = positionY + tooltip.caretY + 6 + "px";
				}
			  } else {
				tooltipEl.style.left = positionX + tooltip.caretX + 40 + "px";
				tooltipEl.style.top =
				  positionY + tooltip.caretY - tooltipEl.clientHeight - 2 + "px";
			  }
			  if (tooltipEl.clientWidth > tooltip.caretX) {
				tooltipEl.style.left =
				  tooltip.caretX + tooltipEl.clientWidth / 2 + "px";
			  }
			  if (chart.width < tooltip.caretX + tooltipEl.clientWidth) {
				tooltipEl.clientWidth = "136px";
				tooltipEl.style.left =
				  tooltip.caretX - tooltipEl.clientWidth / 1.8 + "px";
			  }
			};
			let txtForLabel1new = "Asset Value " + parsedData.money;
	  
			let switchLegendLine2new = false;
			if (parsedData.data.length == 2) {
			  switchLegendLine2new = true;
			}


			const getOrCreateLegendList2ef = (chart, id) => {
			
				const legendContainer = document.getElementById(instanceCanvasId);
				let listContainer = instanceContainer.querySelector('ul');
				
				if (!listContainer) {
				  listContainer = document.createElement('ul');
				  listContainer.style.display = 'flex';
				  listContainer.style.flexDirection = 'column';
				  listContainer.style.margin = 0;
				  listContainer.style.padding = 0;
				//   listContainer.style.marginTop = -20;
				  legendContainer.appendChild(listContainer);
				}
			  
				return listContainer;
			  };
		
			  const htmlLegendPlugin2ef = {
					afterUpdate(chart, args, options) {
				const ul = getOrCreateLegendList2ef(chart, options.containerID);
					  // Remove old legend items
					  while (ul.firstChild) {
						ul.firstChild.remove();
					  }
					  //Reuse the built-in legendItems generator
					  const items = chart.options.plugins.legend.labels.generateLabels(chart);
					  let table = document.createElement("table");

	
					  items.forEach(item => {
							const li = document.createElement('li');
							li.style.alignItems = 'center';
							li.style.cursor = 'pointer';
							li.style.display = 'flex';
							// li.style.width = '200px';
							// li.style.positon = 'absolute'
							li.style.justifyContent = 'right'
							li.style.flexDirection = 'row';
							li.style.marginLeft = '5px';
							li.style.marginTop = `-${properties.bubble.height()/1.5}px`;
							li.style.marginRight = '32px';
							// li.style.backgroundColor = 'rgb(255,0,0)';
							const li2 = document.createElement('li');
							li2.style.alignItems = 'center';
							li2.style.cursor = 'pointer';
							li2.style.display = 'flex';
							// li.style.width = '200px';
							// li.style.positon = 'absolute'
							li2.style.justifyContent = 'right'
							li2.style.flexDirection = 'row';
							li2.style.marginLeft = '5px';
							li2.style.marginRight = '32px';
							// li2.style.backgroundColor = 'rgb(255,0,0)';
							// Color box
							const boxSpan = document.createElement('span');
							boxSpan.style.background = "#7bd6f2";
							boxSpan.style.borderColor ="#7bd6f2";
							boxSpan.style.borderWidth = '12px';
							boxSpan.style.display = 'inline-block';
							boxSpan.style.height = '15px';
							boxSpan.style.marginRight = '5px';
							boxSpan.style.minWidth = '15px';
							boxSpan.style.borderRadius = "3px";
							boxSpan.style.marginTop = '-40px'

							const boxSpan2 = document.createElement('span');
							boxSpan2.style.background = "#F8B961";
							boxSpan2.style.borderColor ="#F8B961";
							boxSpan2.style.borderWidth = '12px';
							boxSpan2.style.display = 'inline-block';
							boxSpan2.style.height = '15px';
							boxSpan2.style.marginRight = '5px';
							boxSpan2.style.minWidth = '15px';
							boxSpan2.style.borderRadius = "3px";
							boxSpan2.style.marginTop = '-6px'
							// Text datasetIndex
							const textContainer = document.createElement('p');
							textContainer.style.color = '#000';
							textContainer.style.margin = 0;
							textContainer.style.padding = 0;
							textContainer.style.marginTop = '-45px'
							const textContainer2 = document.createElement('p');
							textContainer2.style.color = '#000';
							textContainer2.style.margin = 0;
							textContainer2.style.padding = 0;
							textContainer2.style.marginTop = '-7px'
							const textContainerSpan = document.createElement('span');
							textContainerSpan.style.color = '#000';
							textContainerSpan.style.fontWeight = '500';
							textContainerSpan.style.fontFamily = "Jost";
							textContainerSpan.style.fontSize = "12px";
							textContainerSpan.style.display = 'inline-block';
							textContainerSpan.style.minWidth = "63px";
							const textContainerSpan2 = document.createElement('span');
							textContainerSpan2.style.color = '#000';
							textContainerSpan2.style.fontWeight = '500';
							textContainerSpan2.style.fontFamily = "Jost";
							textContainerSpan2.style.fontSize = "12px";
							textContainerSpan2.style.display = 'inline-block';
							textContainerSpan2.style.minWidth = "63px";
							const textContainerSpan3 = document.createElement('span');
							textContainerSpan3.style.color = '#000';
							textContainerSpan3.style.fontWeight = '600';
							textContainerSpan3.style.fontFamily = "Jost";
							textContainerSpan3.style.fontSize = "11px";
							const textContainerSpan4 = document.createElement('span');
							textContainerSpan4.style.color = '#000';
							textContainerSpan4.style.fontWeight = '600';
							textContainerSpan4.style.fontFamily = "Jost";
							textContainerSpan4.style.fontSize = "11px";
							const text = document.createTextNode(instance.data.specialOldDate);
							const text2 = document.createTextNode(instance.data.specialNewDate);

							textContainerSpan.appendChild(text);
							textContainerSpan2.appendChild(text2);
							textContainer.appendChild(textContainerSpan);
							textContainer2.appendChild(textContainerSpan2);
							li.appendChild(boxSpan);
							li.appendChild(textContainer);
							li2.appendChild(boxSpan2);
							li2.appendChild(textContainer2);

							if(instance.data.specialOldDate != undefined){
							ul.appendChild(li);
							}
							
							if(instance.data.specialNewDate != undefined){
								ul.appendChild(li2);
							}
							
					  });
					  instanceContainer.appendChild(table)

					}
				};
	
			  chartPlugin = [htmlLegendPlugin2ef]



			chartOptions = {
			  maintainAspectRatio: false,
			  onClick: function (evt, activeElements) {
				console.log(this.data);
				this.update();
			  },
			  responsive: true,
			  layout: {
				padding: {
				  top: 10,
				  left: 16,
				  bottom: 16,
				  right: 150,
				},
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
					beginAtZero: true,
				  title: {
					display: true,
					text: txtForLabel1new,
					color: "#2A2A2A",
					align: "center",
					font: {
					  size: 13,
					  family: "Poppins",
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
					  if (valIdentificator == "K") {
						return value / 1000;
					  } else if (valIdentificator == "M") {
						return value / 1000000;
					  } else {
						return value;
					  }
					},
				  },
				},
			  },
			  plugins: {
				legend: {
				  position: "right",
				  display: false,
				  labels: {
					usePointStyle: true,
					pointStyle: "rectRounded",
					padding: 20,
					boxWidth: 16,
					boxHeight: 16,
				  },
				},
				tooltip: {
				  enabled: false,
				  position: "nearest",
				  external: externalTooltipHandlernew,
				},
				title: {
				  display: true,
				  color: "#2A2A2A",
				  text: parsedData.title,
				  padding: {
					top: 10,
					bottom: 30,
				  },
				  font: {
					size: 18,
					weight: "bold",
					family: "Jost",
					lineHeight: 1.2,
				  },
				  align: "start",
				},
			  },
			};
		  break;
		default:
	  }
	  //================================ Chart color fill (background color)
	  let funcDraw = {
		beforeDraw: (chart) => {
		  const { ctx } = chart;
		  ctx.save();
		  ctx.fillStyle = "#fff";
		  ctx.fillRect(0, 0, chart.width, chart.height);
		  ctx.restore();
		},
	  };
	  chartPlugin.push(funcDraw);
	  const ctx = document.getElementById(mainCanvasID).getContext("2d");

	  //================================= Chart Generator
	  var mchart = new Chart(ctx, {
		type: chart,
		data: chartData,
		options: chartOptions,
		plugins: chartPlugin,
	  });

	  if (chartType == "line" || chartType == "doughnut-pie" || chartType == "doughnut-pie-diff") {
		mchart.id = instance.data.updateableChartID;
		instance.data.hummingbirb = mchart;
		instance.data.chartdata = chartData;
	  }
	  if (chartType == "groupedBar") {
		instance.data.specialidhere = mchart
		instance.data.specialidhereoptions = chartOptions
		instance.data.specialidhereData = chartData

	  }
	  if(chartType == "doughnut-pie" && chartOptions.plugins.legend.position == "bottom" || chartType == "doughnut-pie-diff" && chartOptions.plugins.legend.position == "bottom"){
			// mchart.legend.top += 45;
			chartOptions.plugins.legend.labels.padding = 22
			mchart.update()
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
	//   if (chartType == "horizontalBar" && instanceContainer.clientWidth <= 478) {
	// 	// chartOptions.plugins.legend.labels.color = "#FFF";
	// 	// chartOptions.plugins.legend.labels.boxWidth = 0;
	// 	// chartOptions.plugins.legend.labels.boxHeight = 0;
	// 	chartOptions.plugins.legend.display = false;
	// 	let zebraa = document.createElement("div");
	// 	zebraa.style.width = "300px";
	// 	zebraa.style.height = "80px";
	// 	zebraa.style.position = "absolute";
	// 	zebraa.style.left = "5px";
	// 	zebraa.style.bottom = "10px";
	// 	zebraa.style.zIndex = "10";
	// 	instanceContainer.appendChild(zebraa);
	// 	let table1 = document.createElement("table");
	// 	table1.style.width = "100%";
	// 	table1.style.height = "100%";
	// 	table1.style.fontSize = "12px";
	// 	table1.style.tableLayout = "fixed";
	// 	table1.style.color = mchart.legend.legendItems[0].fontColor;
	
	// 	for (let i = 0; i < mchart.legend.legendItems.length; i++) {
	// 	  let newtext1 = document.createTextNode(
	// 		" " + mchart.legend.legendItems[i].text
	// 	  );
	// 	  let th1 = document.createElement("th");
	// 	  let th2 = document.createElement("th");
	// 	  let tr1 = document.createElement("tr");
	// 	  let box = document.createElement("div");
	// 	  box.style.width = "14px";
	// 	  box.style.height = "14px";
	// 	  box.style.backgroundColor = mchart.legend.legendItems[i].fillStyle;
	// 	  box.style.margin = "auto";
	// 	  th1.style.width = "20px";
	// 	  th2.style.paddingLeft = "3px";
	// 	  th1.style.verticalAlign = "middle";
	// 	  th2.style.verticalAlign = "middle";
	// 	  th1.appendChild(box);
	// 	  th2.appendChild(newtext1);
	// 	  th2.style.textAlign = "left";
	// 	  tr1.appendChild(th1);
	// 	  tr1.appendChild(th2);
	// 	  table1.appendChild(tr1);
	// 	}
	
	// 	zebraa.appendChild(table1);
	// 	mchart.update();
	//   }
	  if (chartType == "bar") {
		let dataArr = mchart.data.datasets[0].data;
		let colorBackg = mchart.data.datasets[0].backgroundColor[0];
		let colorBackgDark = "rgba(4, 35, 45,1)";
	
		let colorBackArr = [];
		for (let i = 0; i < dataArr.length; i++) {
		  if (dataArr[i] > 0) {
			colorBackArr.push(colorBackg);
		  } else {
			colorBackArr.push(colorBackgDark);
		  }
		}
		mchart.data.datasets[0].backgroundColor = colorBackArr;
		mchart.data.datasets[0].borderColor = colorBackArr;
		mchart.update();
	  }
	  if (instanceContainer.clientWidth <= 478 && chartType == "groupedBar") {
		chartOptions.layout.padding = {
		  left: 28,
		  right: 32,
		  top: 45,
		  bottom: 5,
		};
		mchart.update();
	  }
	
	  function afterDrawBarNegative() {
		let dataArr = mchart.data.datasets[0].data;
		let colorBackg = "rgba(13, 105, 134, 1)";
		let colorBackgDark = "rgba(4, 35, 45,1)";
	
		let colorBackArr = [];
		for (let i = 0; i < dataArr.length; i++) {
		  if (dataArr[i] > 0) {
			colorBackArr.push(colorBackg);
		  } else {
			colorBackArr.push(colorBackgDark);
		  }
		}
		mchart.data.datasets[0].backgroundColor = colorBackArr;
		mchart.data.datasets[0].borderColor = colorBackArr;
		mchart.update();
	  }
	
	  if (chartType == "radar" || chartType == "radar2") {
		instance.data.hummingbirbBarRadar = mchart;
		instance.data.chartdata = chartData;
	  }
	  if (chartType == "bar") {
		instance.data.hummingbirbBarRadar = mchart;
		instance.data.chartdatae = chartData;
	  }
	  if (chartType == "bar") {
		instance.data.hummingbirbBarRadar = mchart;
		instance.data.chartdatae = chartData;
	  }
	
	  var step = 5;
	
	
	  //CHARTTYPE LINE HERE ORIGINALY-----------------------------------------------------------------------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	  if (chartType == "line2" || chartType == "lineNew") {
		//quarter button
		var selectDisplayMain = document.createElement("button");
		selectDisplayMain.classList.add("dropbtn");
		var selectDisplay = document.createElement("button");
		selectDisplay.classList.add("dropbtn");
		instanceContainer.appendChild(selectDisplay);
	
		selectDisplayMainID = makeid(20);
		selectDisplayMain.id = selectDisplayMainID;
		selectDisplayID = makeid(20);
		selectDisplay.id = selectDisplayID;
		instance.data.selectDisplayMainIDLine2 = selectDisplayMainID;
		instance.data.selectDisplayIDLine2 = selectDisplayID;
	
		selectDisplayMain.innerHTML = "Quarter ˅";
		instanceContainer.appendChild(selectDisplayMain);
		selectDisplay.innerHTML = "Year";
		selectDisplay.style.position = "absolute";
		selectDisplay.style.top = `35px`;
		selectDisplay.style.right = `${90}px`;
		selectDisplay.style.display = "none";
		selectDisplayMain.style.position = "absolute";
		selectDisplayMain.style.top = `10px`;
		selectDisplayMain.style.right = `${90}px`;
		selectDisplayMain.style.height = "40px";
		selectDisplayMain.style.width = "90px";
		selectDisplay.style.height = "40px";
		selectDisplay.style.width = "90px";
		selectDisplayMain.style.zIndex = "10";
	  }
	  if (chartType == "bar") {
		instance.data.chartoptBAR = chartOptions;
	  }
	  var entBarData2aORG = chartData.datasets[0].data;
	  var entBarData2aORGyears = [];
	  var entBarData2aORGyearsLabels = [];
	  //=======================================================================================BAR CHART BUTTONS
	  var mobileBubbleCheight = 0;
	  if (chartType == "bubble" && instanceContainer.clientWidth <= 478) {
		chartOptions.layout.padding = {
		  left: 30,
		  right: 0,
		  top: 10,
		  bottom: 5,
		};
		mobileBubbleCheight = mchart.scales.x.bottom - mchart.scales.x.maxHeight;
		mchart.update();
	  }
	  if (chartType == "bubble" && instanceContainer.clientWidth <= 478) {
		let orgMaxArr = [];
		for (let i = 0; i < parsedData.data.length; i++) {
		  parsedData.data[i].assets.forEach((el) =>
			orgMaxArr.push(el.years_to_launch)
		  );
		}
	
		let orgMax = Math.max(...orgMaxArr);
		moveButtonsBubbleMobile(orgMax);
	  }
	
	  if (chartType == "bar") {
		let lblYears = [];
		moveButtons(12);
		for (label in labelsBarExtracted) {
		  let data = labelsBarExtracted[label].substring(0, 4);
	
		  if (!lblYears.includes(data) && data != " ") {
			lblYears.push(data);
		  }
		}
	
		let currLabels = chartData.labels;
	
		let datasetData = chartData.datasets[0].data;
		let newDataSet = [];
		let newDataSet2 = [];
		let newDataSet3 = [];
		let newDataSetLabels = [];
		for (let j = 0; j < lblYears.length; j++) {
		  let dataAmm = 0;
		  let dataAmm2 = 0;
		  let dataAmm3 = 0;
		  for (let i = 0; i < datasetData.length; i++) {
			let currLabel = currLabels[i];
			if (currLabel.includes(lblYears[j])) {
			  dataAmm += datasetData[i];
			  dataAmm2 += datasetsGroupedminiO2Minus[i];
			  dataAmm3 += datasetsGroupedminiO2Plus[i];
			}
		  }
		  newDataSetLabels.push(lblYears[j]);
		  newDataSet.push(dataAmm);
		  newDataSet2.push(dataAmm2);
		  newDataSet3.push(dataAmm3);
		}
		newDataSet1ForTooltip = newDataSet;
		entBarData2aORGyears = newDataSet;
		entBarData2aORGyearsLabels = newDataSetLabels;
	
		var entBarData2aORGminus = datasetsGroupedminiO2Minus;
		var entBarData2aORGyearsminus = newDataSet2;
		var entBarData2aORGplus = datasetsGroupedminiO2Plus;
		var entBarData2aORGyearsplus = newDataSet3;
		var selectDisplayMain = document.createElement("button");
		selectDisplayMain.classList.add("dropbtn");
		var selectDisplay = document.createElement("button");
		selectDisplay.classList.add("dropbtn");
		instanceContainer.appendChild(selectDisplay);
	
		selectDisplayMainID = makeid(20);
		selectDisplayMain.id = selectDisplayMainID;
		selectDisplayID = makeid(20);
		selectDisplay.id = selectDisplayID;
		instance.data.selectDisplayMainIDLine2 = selectDisplayMainID;
		instance.data.selectDisplayIDLine2 = selectDisplayID;
	
		selectDisplayMain.innerHTML = "Quarter ˅";
		instanceContainer.style.position = "relative";
		selectDisplay.innerHTML = "Year";
		selectDisplay.style.position = "absolute";
		selectDisplay.style.top = `35px`;
		selectDisplay.style.display = "none";
		selectDisplayMain.style.position = "absolute";
		selectDisplayMain.style.top = `10px`;
		selectDisplayMain.style.height = "40px";
		selectDisplayMain.style.width = "90px";
		selectDisplay.style.height = "40px";
		selectDisplay.style.width = "90px";
		selectDisplayMain.style.zIndex = "10";
		var wacc1btn = document.createElement("button");
		wacc1btn.classList.add("button");
		wacc1btn.id = makeid(23);
		instance.data.clickedbutton = wacc1btn.id;
		wacc1btn.innerHTML = parsedData.name;
		wacc1btn.style.left = `${mchart.width - 235}px`; //pos
		wacc1btn.style.zIndex = "10";
		var wacc2btn = document.createElement("button");
		wacc2btn.classList.add("button");
		wacc2btn.id = makeid(23);
		instance.data.clickedbuttonWACC2 = wacc2btn.id;
		wacc2btn.innerHTML = parsedData.name + " -" + parsedData.percentage + "%";
		wacc2btn.style.zIndex = "10";
		var wacc3btn = document.createElement("button");
		wacc3btn.classList.add("button");
		wacc3btn.id = makeid(23);
		instance.data.clickedbuttonWACC3 = wacc3btn.id;
		wacc3btn.innerHTML = parsedData.name + " +" + parsedData.percentage + "%";
		wacc3btn.style.zIndex = "10";
		var clickedbutton = "wacc";
		wacc1btn.style.backgroundColor = "#F59F26";
		wacc1btn.style.color = "#fff";
		var waccContainer22fga = document.createElement("span");
		waccContainer22fga.classList.add("btnContainerPluginTop");
		waccContainer22fga.style.top = "15px";
		waccContainer22fga.style.height = `30px`;
		waccContainer22fga.style.position = "absolute";
		waccContainer22fga.style.right = `5px`; //pos
		waccContainer22fga.style.zIndex = "12";
		instanceContainer.appendChild(waccContainer22fga);
	
		waccContainer22fga.appendChild(wacc2btn);
		waccContainer22fga.appendChild(wacc1btn);
		waccContainer22fga.appendChild(wacc3btn);
	
		//functions
		selectDisplayMain.onclick = function () {
		  selectDisplay.style.display = "block";
		  mchart.update();
		};
		
		selectDisplay.onclick = function () {
		  selectDisplay.style.display = "none";
		//   if (selectDisplayMain.innerHTML == "Quarter ˅") {
			selectDisplayMain.innerHTML = "Year ˅";
			selectDisplay.innerHTML = "Quarter";
			clickedbutton = "wacc";
			wacc1btn.style.color = "#FFF";
			wacc2btn.style.color = "#F59F26";
			wacc3btn.style.color = "#F59F26";
			wacc1btn.style.backgroundColor = "#F59F26";
			wacc2btn.style.backgroundColor = "#FFFFFF";
			wacc3btn.style.backgroundColor = "#FFFFFF";
			if (instance.data.test1aMINUS.length != 0) {
			  entBarData2aORGminus = instance.data.test1aMINUS;
			  entBarData2aORGplus = instance.data.test1aPLUS;
			  entBarData2aORG = instance.data.test1aORG;
			  entBarData2aORGyearsLabels = instance.data.newDataSetLabels;
			  entBarData2aORGyears = instance.data.newDataSet;
			  entBarData2aORGyearsminus = instance.data.newDataSet2;
			  entBarData2aORGyearsplus = instance.data.newDataSet3;
			}
			if (clickedbutton == "wacc") {
			  chartData.labels = entBarData2aORGyearsLabels;
			  chartData.datasets[0].data = entBarData2aORGyears; //EDIT HERRR
			  let z = Math.min(...entBarData2aORGyears);
			  if (z < 0) {
				chartOptions.scales.y.suggestedMin = z;
			  } else {
				chartOptions.scales.y.suggestedMin = 0;
			  }
			  let maxDataYbare = Math.round(Math.max(...entBarData2aORGyears));
			  let maxValueBare =
				Math.round(maxDataYbare / rounderValue) * rounderValue;
			  chartOptions.scales.y.suggestedMax = maxValueBare;
			}
			chartOptions.scales.x.min = 0;
	
			chartOptions.scales.x.max = 10;
			yearorquarterhandler = 2;
			let dataArr = chartData.datasets[0].data;
			let colorBackg = "rgba(13, 105, 134, 1)";
			let colorBackgDark = "rgba(4, 35, 45,1)";
	
			let colorBackArr = [];
			for (let i = 0; i < dataArr.length; i++) {
			  if (dataArr[i] > 0) {
				colorBackArr.push(colorBackg);
			  } else {
				colorBackArr.push(colorBackgDark);
			  }
			}
			chartData.datasets[0].backgroundColor = colorBackArr;
			chartData.datasets[0].borderColor = colorBackArr;
	
			mchart.update();
	
		  if (chartData.datasets[0].data.length < 12) {
			deleteMoveButtons();
		  } else {
			moveButtons(12);
		  }
		  afterDrawBarNegative();
		};
		selectDisplay.click();
		wacc1btn.onclick = function () {
		  if (instance.data.test1aMINUS.length != 0) {
			entBarData2aORGminus = instance.data.test1aMINUS;
			entBarData2aORGplus = instance.data.test1aPLUS;
			entBarData2aORG = instance.data.test1aORG;
			entBarData2aORGyearsLabels = instance.data.newDataSetLabels;
			entBarData2aORGyears = instance.data.newDataSet;
			entBarData2aORGyearsminus = instance.data.newDataSet2;
			entBarData2aORGyearsplus = instance.data.newDataSet3;
		  }
		  if (clickedbutton == "wacc") {
		  } else {
			if (yearorquarterhandler == 2) {
			  chartData.datasets[0].data = entBarData2aORGyears;
			  let z = Math.min(...entBarData2aORGyears);
			  if (z < 0) {
				chartOptions.scales.y.suggestedMin = z;
			  } else {
				chartOptions.scales.y.suggestedMin = 0;
			  }
			  let maxDataYbare = Math.round(Math.max(...entBarData2aORGyears));
			  let maxValueBare =
				Math.round(maxDataYbare / rounderValue) * rounderValue;
			  chartOptions.scales.y.suggestedMax = maxValueBare;
			} else {
			  chartData.datasets[0].data = entBarData2aORG;
			  let z = Math.min(...entBarData2aORG);
			  if (z < 0) {
				chartOptions.scales.y.suggestedMin = z;
			  } else {
				chartOptions.scales.y.suggestedMin = 0;
			  }
			  let maxDataYbare = Math.round(Math.max(...entBarData2aORG));
			  let maxValueBare =
				Math.round(maxDataYbare / rounderValue) * rounderValue;
			  chartOptions.scales.y.suggestedMax = maxValueBare;
			}
			clickedbutton = "wacc";
			wacc1btn.style.color = "#FFF";
			wacc2btn.style.color = "#F59F26";
			wacc3btn.style.color = "#F59F26";
			wacc1btn.style.backgroundColor = "#F59F26";
			wacc2btn.style.backgroundColor = "#FFFFFF";
			wacc3btn.style.backgroundColor = "#FFFFFF";
			mchart.update();
		  }
		  afterDrawBarNegative();
		};
		wacc2btn.onclick = function () {
		  if (clickedbutton == "wacc2") {
		  } else {
			if (yearorquarterhandler == 2) {
			  chartData.datasets[0].data = entBarData2aORGyearsminus;
			  let z = Math.min(...entBarData2aORGyearsminus);
			  if (z < 0) {
				chartOptions.scales.y.suggestedMin = z;
			  } else {
				chartOptions.scales.y.suggestedMin = 0;
			  }
			  chartOptions.scales.y.suggestedMax = Math.max(...entBarData2aORGyearsminus);
			} else {
			  if (instance.data.test1aMINUS.length != 0) {
				entBarData2aORGminus = instance.data.test1aMINUS;
				entBarData2aORGplus = instance.data.test1aPLUS;
				entBarData2aORG = instance.data.test1aORG;
				entBarData2aORGyearsLabels = instance.data.newDataSetLabels;
				entBarData2aORGyears = instance.data.newDataSet;
				entBarData2aORGyearsminus = instance.data.newDataSet2;
				entBarData2aORGyearsplus = instance.data.newDataSet3;
			  }
			  chartData.datasets[0].data = entBarData2aORGminus;
			  let z = Math.min(...entBarData2aORGminus);
			  if (z < 0) {
				chartOptions.scales.y.suggestedMin = z;
			  } else {
				chartOptions.scales.y.suggestedMin = 0;
			  }
			  chartOptions.scales.y.suggestedMax = Math.max(...entBarData2aORGminus);
			}
			clickedbutton = "wacc2";
	
			wacc1btn.style.backgroundColor = "#FFFFFF";
			wacc2btn.style.backgroundColor = "#F59F26";
			wacc1btn.style.color = "#F59F26";
			wacc2btn.style.color = "#fff";
			wacc3btn.style.color = "#F59F26";
			wacc3btn.style.backgroundColor = "#FFFFFF";
			mchart.update();
		  }
		  afterDrawBarNegative();
		};
		wacc3btn.onclick = function () {
		  if (clickedbutton == "wacc3") {
		  } else {
			if (instance.data.test1aMINUS.length != 0) {
			  entBarData2aORGminus = instance.data.test1aMINUS;
			  entBarData2aORGplus = instance.data.test1aPLUS;
			  entBarData2aORG = instance.data.test1aORG;
			  entBarData2aORGyearsLabels = instance.data.newDataSetLabels;
			  entBarData2aORGyears = instance.data.newDataSet;
			  entBarData2aORGyearsminus = instance.data.newDataSet2;
			  entBarData2aORGyearsplus = instance.data.newDataSet3;
			}
			if (yearorquarterhandler == 2) {
			  chartData.datasets[0].data = entBarData2aORGyearsplus;
			  let z = Math.min(...entBarData2aORGyearsplus);
			  if (z < 0) {
				chartOptions.scales.y.suggestedMin = z;
			  } else {
				chartOptions.scales.y.suggestedMin = 0;
			  }
			  chartOptions.scales.y.suggestedMax = Math.max(...entBarData2aORGyearsplus);
			} else {
			  chartData.datasets[0].data = entBarData2aORGplus;
			  let z = Math.min(...entBarData2aORGplus);
			  if (z < 0) {
				chartOptions.scales.y.suggestedMin = z;
			  } else {
				chartOptions.scales.y.suggestedMin = 0;
			  }
			  chartOptions.scales.y.suggestedMax = Math.max(...entBarData2aORGplus);
			}
			clickedbutton = "wacc3";
			wacc1btn.style.backgroundColor = "#FFFFFF";
			wacc2btn.style.backgroundColor = "#FFFFFF";
			wacc1btn.style.color = "#F59F26";
			wacc2btn.style.color = "#F59F26";
			wacc3btn.style.color = "#fff";
			wacc3btn.style.backgroundColor = "#F59F26";
			mchart.update();
		  }
		  afterDrawBarNegative();
		};
	  }
	  //=======================================================================================GROUPED BAR CHART BUTTONS
	  if (chartType == "groupedBar") {
		moveButtons(11);
		let yearorquarterhandlerGrouped = 1;
		let entBarData2aORGyearsG = [];
		let entBarData2aORGyears2G = [];
		let datasetDataHolder = [];
		let datasetDataHolderOriginal = [];
		let numbersCopy = [];
		for (let i = 0; i < chartData.datasets.length; i++) {
		  datasetDataHolder.push(chartData.datasets[i].data);
		  numbersCopy = chartData.datasets[i].data.map((x) => x);
		  datasetDataHolderOriginal.push(numbersCopy);
		}
	
		let lblYears = [];
		for (label in mainDateQuarters2) {
		  let data = mainDateQuarters2[label].substring(0, 4);
		  if (!lblYears.includes(data) && data != " ") {
			lblYears.push(data);
		  }
		}
	
		let currLabels = mainDateQuarters2;
		let newDataSet = [];
	
		let dataAmm0 = 0;
		let newDataSet0 = [];
		let newDataSet021 = [];
		let newDataSetHolder = [];
	
		for (let a = 0; a < datasetDataHolder.length; a++) {
		  newDataSet0 = [];
		  for (let j = 0; j < lblYears.length; j++) {
			dataAmm0 = 0;
			for (let i = 0; i < datasetDataHolder[a].length; i++) {
			  let currLabel = currLabels[i];
			  if (currLabel.includes(lblYears[j])) {
				dataAmm0 += datasetDataHolder[a][i];
			  }
			}
			newDataSet0.push(dataAmm0);
			newDataSet021.push(dataAmm0);
		  }
		  newDataSetHolder.push({
			label: parsedData.data[a].name,
			data: newDataSet0,
			backgroundColor: colorsNewArrBlue2[a],
			borderColor: "#FFFFFF",
		  });
		}
	
		newDataSet1ForTooltip = newDataSet;
		var selectDisplayMain = document.createElement("button");
		selectDisplayMain.classList.add("dropbtn");
		var selectDisplay = document.createElement("button");
	
		selectDisplay.classList.add("dropbtn");
		// instanceContainer.appendChild(selectDisplay);
	
		selectDisplayMainID = makeid(20);
		selectDisplayMain.id = selectDisplayMainID;
		selectDisplayID = makeid(20);
		selectDisplay.id = selectDisplayID;
		instance.data.selectDisplayMainIDLine2 = selectDisplayMainID;
		instance.data.selectDisplayIDLine2 = selectDisplayID;
	
		selectDisplayMain.innerHTML = "Quarter ˅";
		// instanceContainer.appendChild(selectDisplayMain);
		selectDisplay.innerHTML = "Year";
		selectDisplay.style.position = "absolute";
		selectDisplay.style.top = `35px`;
		selectDisplay.style.right = `90px`; //pos
		//selectDisplay.style.left =`${mchart.width - 90}px`;//pos
		selectDisplay.style.display = "none";
		selectDisplayMain.style.position = "absolute";
		selectDisplayMain.style.top = `10px`;
		selectDisplayMain.style.left = `${mchart.width - 90}px`;
		selectDisplayMain.style.height = "40px";
		selectDisplayMain.style.width = "90px";
		selectDisplay.style.height = "40px";
		selectDisplay.style.width = "90px";
		selectDisplayMain.style.zIndex = "10";
	
		//============================================functions
		selectDisplayMain.onclick = function () {
		  selectDisplay.style.display = "block";
		  mchart.update();
		};
		selectDisplay.click();
		selectDisplay.onclick = function () {
		  selectDisplay.style.display = "none";
		  //set auto button to orginal wacc data after change of data display
		  clickedbutton = "wacc";
	
		  if (selectDisplayMain.innerHTML == "Quarter ˅") {
			selectDisplayMain.innerHTML = "Year ˅";
			selectDisplay.innerHTML = "Quarter";
	
			//CLICKED BUTTONS
			chartData.labels = lblYears;
			chartOptions.scales.x.min = 0;
			chartOptions.scales.x.max = 11;
			yearorquarterhandlerGrouped = 2;
			chartData.datasets = newDataSetHolder;
			let dbtkk = Math.min(...newDataSet021);
			if (dbtkk < 0) {
			  chartOptions.scales.y.suggestedMin = dbtkk;
			} else {
			  chartOptions.scales.y.suggestedMin = 0;
			}
	
			chartOptions.scales.y.suggestedMax = Math.max(...newDataSet021);
			mchart.update();
		  } else {
			yearorquarterhandlerGrouped = 1;
			chartOptions.scales.x.min = 0;
			chartOptions.scales.x.max = 3;
			chartData.labels = mainDateQuarters2;
	
			let orgDta = [];
			for (let i = 0; i < chartData.datasets.length; i++) {
			  orgDta.push({
				label: parsedData.data[i].name,
				data: datasetDataHolderOriginal[i],
				backgroundColor: colorsNewArrBlue2[i],
				borderColor: "#FFFFFF",
			  });
			}
			chartData.datasets = orgDta;
			selectDisplayMain.innerHTML = "Quarter ˅";
			selectDisplay.innerHTML = "Year";
			let huhgunuinui = [];
	
			for (let i = 0; i < datasetDataHolderOriginal.length; i++) {
			  datasetDataHolderOriginal[i].forEach((el) => huhgunuinui.push(el));
			}
	
			let dbtkke = Math.min(...huhgunuinui);
			if (dbtkke < 0) {
			  chartOptions.scales.y.suggestedMin = dbtkke;
			} else {
			  chartOptions.scales.y.suggestedMin = 0;
			}
	
			chartOptions.scales.y.suggestedMax = Math.max(...huhgunuinui);
	
			mchart.update();
		  }
	
		  if (chartData.datasets[0].data.length < 7) {
			deleteMoveButtons();
		  } else {
			moveButtons(0);
		  }
		};
		selectDisplay.click();
	  }
	
	  function moveButtonsBubbleMobile(orgMax) {
		let step = 3;
		let allChildren = instanceContainer.querySelectorAll(".moveBTN");
		if (allChildren.length == 0) {
		  var moveLeftBtn = document.createElement("button");
		  moveLeftBtn.classList.add("moveBTN");
		  var moveLeftBtnID = makeid(20);
		  moveLeftBtn.id = moveLeftBtnID;
		  moveLeftBtn.innerHTML = "";
		  moveLeftBtn.style.position = "absolute";
		  moveLeftBtn.style.top = `${
			(mchart.chartArea.bottom - mchart.chartArea.top) / 2 -
			14 +
			mchart.chartArea.top
		  }px`; //`${mchart.height/2 - 20}px`;
		  moveLeftBtn.style.left = `5px`;
		  moveLeftBtn.style.display = "none";
		  moveLeftBtn.style.height = "28px";
		  moveLeftBtn.style.width = "28px";
		  moveLeftBtn.style.zIndex = "10";
	
		  var moveRightBtnInner = document.createElement("button");
		  moveRightBtnInner.classList.add("specialArrowBtnMove");
		  moveRightBtnInner.style.position = "relative";
		  moveRightBtnInner.style.top = `0px`;
		  moveRightBtnInner.style.left = "-5px";
		  moveRightBtnInner.style.right = "-10px";
		  moveRightBtnInner.style.zIndex = "10";
		  moveRightBtnInner.style.display = "block";
	
		  var moveweLeftBtnInner = document.createElement("button");
		  moveweLeftBtnInner.classList.add("specialArrowBtnMoveLeft");
		  moveweLeftBtnInner.style.position = "relative";
		  moveweLeftBtnInner.style.top = `0px`;
		  moveweLeftBtnInner.style.left = "-3px";
		  moveweLeftBtnInner.style.zIndex = "10";
		  moveweLeftBtnInner.style.display = "block";
	
		  var moveRightBtn = document.createElement("button");
		  moveRightBtn.classList.add("moveBTN");
		  moveRightBtn.innerHTML = "";
		  moveRightBtn.style.position = "absolute";
		  moveRightBtn.style.top = `${
			(mchart.chartArea.bottom - mchart.chartArea.top) / 2 -
			14 +
			mchart.chartArea.top
		  }px`;
		  moveRightBtn.style.right = "5px";
		  moveRightBtn.style.zIndex = "10";
		  moveRightBtn.style.display = "block";
		  moveRightBtn.style.height = "28px";
		  moveRightBtn.style.width = "28px";
	
		  moveRightBtn.appendChild(moveRightBtnInner);
		  moveLeftBtn.appendChild(moveweLeftBtnInner);
		  instanceContainer.appendChild(moveLeftBtn);
		  instanceContainer.appendChild(moveRightBtn);
	
		  moveLeftBtn.onclick = function () {
			if (chartOptions.scales.x.min >= step) {
			  chartOptions.scales.x.min -= step;
			  chartOptions.scales.x.max -= step;
			  moveRightBtn.style.display = "block";
			  if (chartOptions.scales.x.min <= -2) {
				moveLeftBtn.style.display = "none";
			  }
			} else {
			  chartOptions.scales.x.min = -2;
			  chartOptions.scales.x.max = step;
			  moveLeftBtn.style.display = "none";
			  moveRightBtn.style.display = "block";
			}
	
			mchart.update();
		  };
		}
	
		moveRightBtn.onclick = function () {
		  let suma = chartOptions.scales.x.max + step;
		  if (suma <= orgMax) {
			chartOptions.scales.x.min = chartOptions.scales.x.max;
			chartOptions.scales.x.max += step;
		  } else {
			chartOptions.scales.x.min = orgMax - step;
			chartOptions.scales.x.max = orgMax + 2;
			moveRightBtn.style.display = "none";
		  }
	
		  if (chartOptions.scales.x.min == -2) {
			moveLeftBtn.style.display = "none";
		  } else {
			moveLeftBtn.style.display = "block";
		  }
	
		  mchart.update();
		};
	  }
	  function moveButtons(stepAdd) {
		let step = 5;
	
		if (stepAdd !== 0) {
		  step = stepAdd;
		}
	
		let allChildren = instanceContainer.querySelectorAll(".moveBTN");
		let moveRightBtnID = 0;
	
		if (allChildren.length == 0) {
		  var moveLeftBtn = document.createElement("button");
		  moveLeftBtn.classList.add("moveBTN");
		  var moveLeftBtnID = makeid(20);
		  moveLeftBtn.id = moveLeftBtnID;
		  moveLeftBtn.innerHTML = ""; 											
		  moveLeftBtn.style.position = "absolute";
		  moveLeftBtn.style.top = `${mchart.height / 2 - 20}px`;
		  moveLeftBtn.style.left = `5px`;
		  moveLeftBtn.style.display = "none";
		  moveLeftBtn.style.height = "40px";
		  moveLeftBtn.style.width = "40px";
		  moveLeftBtn.style.zIndex = "10";
	
		  var moveRightBtnInner = document.createElement("button");
		  moveRightBtnInner.classList.add("specialArrowBtnMove");
		  moveRightBtnInner.style.position = "relative";
		  moveRightBtnInner.style.top = `0px`;
		  moveRightBtnInner.style.left = "-1px";
		  moveRightBtnInner.style.zIndex = "10";
		  moveRightBtnInner.style.display = "block";
	
		  var moveweLeftBtnInner = document.createElement("button");
		  moveweLeftBtnInner.classList.add("specialArrowBtnMoveLeft");
		  moveweLeftBtnInner.style.position = "relative";
		  moveweLeftBtnInner.style.top = `0px`;
		  moveweLeftBtnInner.style.left = "3px";
		  moveweLeftBtnInner.style.zIndex = "10";
		  moveweLeftBtnInner.style.display = "block";
	
		  var moveRightBtn = document.createElement("button");
		  moveRightBtn.classList.add("moveBTN");
		  moveRightBtn.innerHTML = "";
		  moveRightBtn.style.position = "absolute";
		  moveRightBtn.style.top = `${mchart.height / 2 - 20}px`;
		  moveRightBtnID = makeid(20);
		  moveRightBtn.id = moveRightBtnID;
		  instance.data.moveRightBtnID = moveRightBtnID;
		  instance.data.moveRightBtn = moveRightBtn;
		  moveRightBtn.style.right = "5px";
		  moveRightBtn.style.zIndex = "10";
		  moveRightBtn.style.display = "block";
		  moveRightBtn.style.height = "40px";
		  moveRightBtn.style.width = "40px";
	
		  moveRightBtn.appendChild(moveRightBtnInner);
		  moveLeftBtn.appendChild(moveweLeftBtnInner);
		  instanceContainer.appendChild(moveLeftBtn);
		  instanceContainer.appendChild(moveRightBtn);
	
		  if (instanceContainer.clientWidth <= 478) {
			moveLeftBtn.style.top = `${
			  (mchart.chartArea.bottom - mchart.chartArea.top) / 2 -
			  14 +
			  mchart.chartArea.top
			}px`;
			moveLeftBtn.style.left = `5px`;
			moveLeftBtn.style.height = "28px"; //THIS EDIT THIS GOD DAMNIT
			moveLeftBtn.style.width = "28px";
			moveweLeftBtnInner.style.left = "-3px";
	
			moveRightBtnInner.style.left = "-5px";
			moveRightBtnInner.style.right = "-10px";
			moveRightBtn.style.top = `${
			  (mchart.chartArea.bottom - mchart.chartArea.top) / 2 -
			  14 +
			  mchart.chartArea.top
			}px`;
			moveRightBtn.style.height = "28px";
			moveRightBtn.style.width = "28px";
			moveLeftBtn.style.right = `5px`;
		  }
	
		  moveLeftBtn.onclick = function () {
			if (chartOptions.scales.x.min >= step) {
			  chartOptions.scales.x.min -= step;
			  chartOptions.scales.x.max -= step;
			  moveRightBtn.style.display = "block";
			  if (chartOptions.scales.x.min <= 0) {
				moveLeftBtn.style.display = "none";
			  }
			} else {
			  chartOptions.scales.x.min = 0;
			  chartOptions.scales.x.max = step;
			  moveLeftBtn.style.display = "none";
			  moveRightBtn.style.display = "block";
			}
	
			mchart.update();
		  };
	
		  moveRightBtn.onclick = function () {
			if ((chartOptions.scales.x.min = 0)) {
			  moveLeftBtn.style.display = "none";
			} else {
			  moveLeftBtn.style.display = "block";
			}
			let suma = chartOptions.scales.x.max + step;
	
			if (suma >= chartData.datasets[0].data.length) {
			  chartOptions.scales.x.min = chartData.datasets[0].data.length - step;
			  chartOptions.scales.x.max = chartData.datasets[0].data.length;
			  moveRightBtn.style.display = "none";
			} else {
			  chartOptions.scales.x.min = chartOptions.scales.x.max;
			  chartOptions.scales.x.max += step;
			}
			mchart.update();
		  };
		}
	
		if (chartData.datasets[0].data.length > 12) {
		  if (allChildren[1] !== undefined) {
			allChildren[0].style.display = "block";
			allChildren[1].style.display = "block";
		  }
		}
	  }
	
	 
	  //=======================================================================================DOUGHNUT BUTTONS
	  if (chartType == "doughnut-pie") {
		let cntrText = document.createElement("div");
		cntrTextID = makeid(20);
		cntrText.id = cntrTextID;
		instance.data.centerValueID = cntrTextID;
		instanceContainer.appendChild(cntrText);
		cntrText.style.position = "absolute";
		cntrText.style.textAlign = "center";
		let newtext = document.createTextNode(instance.data.centerValue);
		cntrText.style.fontFamily = "Jost";
		cntrText.style.fontSize = "14px";
		cntrText.style.fontWeight = "600";
		cntrText.style.zIndex = "0";
	
		cntrText.appendChild(newtext);
		cntrText.style.top = `${
		  mchart.chartArea.top +
		  mchart.chartArea.height / 2 -
		  cntrText.clientHeight / 2
		}px`;
		cntrText.style.left = `${
		  mchart.chartArea.left +
		  mchart.chartArea.width / 2 -
		  cntrText.clientWidth / 2
		}px`;
	  }
	  //=======================================================================================DOUGHNUT - DIFF BUTTONS
	  if (chartType == "doughnut-pie-diff") {
		let cntrText2ef = document.createElement("p");
		instanceContainer.appendChild(cntrText2ef);
		cntrText2ef.style.position = "absolute";
		let newtexte = document.createTextNode(instance.data.centerValue);
		cntrText2ef.style.fontFamily = "Jost";
		cntrText2ef.style.fontSize = "14px";
		cntrText2ef.style.fontWeight = "600";
		cntrText2ef.style.zIndex = "0";
		cntrText2ef.appendChild(newtexte);
		cntrText2ef.style.top = `${
		  mchart.chartArea.top +
		  mchart.chartArea.height / 2 -
		  cntrText2ef.clientHeight / 2
		}px`;
		cntrText2ef.style.left = `${
		  mchart.chartArea.left +
		  mchart.chartArea.width / 2 -
		  cntrText2ef.clientWidth / 2
		}px`;
	  }
	  instance.publishState("Transfer", false);
	  instance.data.runOnce = true;
	}
	instance.canvas[0].id = instance.data.instanceCanvasId;
	//=============================================RESPONSIVENESS OF CHARTS
	if (
	  instance.data.chartTypeMain == "bar" &&
	  instance.data.instanceContainerMain.clientWidth <= 599 &&
	  instance.data.instanceContainerMain.clientWidth >= 501
	) {
  
	  instance.data.chartOptMain.plugins.subtitle.padding.bottom = 50;
	  let x = document.getElementById(instance.data.clickedbutton)
	  let y = document.getElementById(instance.data.clickedbuttonWACC2)
	  let z = document.getElementById(instance.data.clickedbuttonWACC3)
	  x.style.marginTop='95px'
	  y.style.marginTop='95px'
	  z.style.marginTop='95px'
	  z.style.marginRight='30%'
	}else if (
	  instance.data.chartTypeMain == "bar" &&
	  instance.data.instanceContainerMain.clientWidth >= 600
	) {
	  instance.data.chartOptMain.plugins.subtitle.padding.bottom = 10;
	  let x = document.getElementById(instance.data.clickedbutton)
	  let y = document.getElementById(instance.data.clickedbuttonWACC2)
	  let z = document.getElementById(instance.data.clickedbuttonWACC3)
	  x.style.marginTop='0px'
	  y.style.marginTop='0px'
	  z.style.marginTop='0px'
	  z.style.marginRight='0px'
  
	}else if (
	  instance.data.chartTypeMain == "bar" &&
	  instance.data.instanceContainerMain.clientWidth <= 500 
	){
	  let z = document.getElementById(instance.data.clickedbuttonWACC3)
	  z.style.marginRight='0px'
	}
	//=============================================RESPONSIVENESS OF BUBBLE CHART
	if (
	  instance.data.chartTypeMain == "bubble" &&
	  instance.data.instanceContainerMain.clientWidth <= 478
	) {
	  instance.data.chartOptMain.layout.padding = {
		left: 30,
		right: 0,
		top: 10,
		bottom: 5,
	  };
	  let orgMaxArr = [];
	  for (let i = 0; i < instance.data.chartParsedDataMain.length; i++) {
		instance.data.chartParsedDataMain[i].assets.forEach((el) =>
		  orgMaxArr.push(el.years_to_launch)
		);
	  }
	
	  let orgMax = Math.max(...orgMaxArr);
	  moveButtonsBubbleMobileUPDT(orgMax);
	  instance.data.chart.config._config.options.scales.x.min = -2;
	  instance.data.chart.config._config.options.scales.x.max = 2;
	  instance.data.chart.config._config.options.maintainAspectratio = false;
	  instance.data.chart._aspectRatio = 1;
	
	  instance.data.chart.resize();
	  instance.data.chart.update();
	
	  function moveButtonsBubbleMobileUPDT(orgMax) {
		let step = 3;
		let allChildren =
		  instance.data.instanceContainerMain.querySelectorAll(".moveBTN");
	
		if (allChildren.length == 0) {
		  var moveLeftBtn = document.createElement("button");
		  moveLeftBtn.classList.add("moveBTN");
		  var moveLeftBtnID = makeid(20);
		  moveLeftBtn.id = moveLeftBtnID;
		  moveLeftBtn.innerHTML = "";
		  moveLeftBtn.style.position = "absolute";
		  moveLeftBtn.style.top = `${
			(instance.data.chart.chartArea.bottom -
			  instance.data.chart.chartArea.top) /
			  2 -
			14 +
			instance.data.chart.chartArea.top
		  }px`; //`${mchart.height/2 - 20}px`;
		  moveLeftBtn.style.left = `5px`;
		  moveLeftBtn.style.display = "none";
		  moveLeftBtn.style.height = "28px";
		  moveLeftBtn.style.width = "28px";
		  moveLeftBtn.style.zIndex = "10";
	
		  var moveRightBtnInner = document.createElement("button");
		  moveRightBtnInner.classList.add("specialArrowBtnMove");
		  moveRightBtnInner.style.position = "relative";
		  moveRightBtnInner.style.top = `0px`;
		  moveRightBtnInner.style.left = "-5px";
		  moveRightBtnInner.style.right = "-10px";
		  moveRightBtnInner.style.zIndex = "10";
		  moveRightBtnInner.style.display = "block";
	
		  var moveweLeftBtnInner = document.createElement("button");
		  moveweLeftBtnInner.classList.add("specialArrowBtnMoveLeft");
		  moveweLeftBtnInner.style.position = "relative";
		  moveweLeftBtnInner.style.top = `0px`;
		  moveweLeftBtnInner.style.left = "-3px";
		  moveweLeftBtnInner.style.zIndex = "10";
		  moveweLeftBtnInner.style.display = "block";
	
		  var moveRightBtn = document.createElement("button");
		  moveRightBtn.classList.add("moveBTN");
		  moveRightBtn.innerHTML = "";
		  moveRightBtn.style.position = "absolute";
		  var moveRightBtnID = makeid(20);
		  moveRightBtn.id = moveRightBtnID;
		  moveRightBtn.style.top = `${
			(instance.data.chart.chartArea.bottom -
			  instance.data.chart.chartArea.top) /
			  2 -
			14 +
			instance.data.chart.chartArea.top
		  }px`;
		  moveRightBtn.style.right = "5px";
		  moveRightBtn.style.zIndex = "10";
		  moveRightBtn.style.display = "block";
		  moveRightBtn.style.height = "28px";
		  moveRightBtn.style.width = "28px";
	
		  moveRightBtn.appendChild(moveRightBtnInner);
		  moveLeftBtn.appendChild(moveweLeftBtnInner);
		  instance.data.instanceContainerMain.appendChild(moveLeftBtn);
		  instance.data.instanceContainerMain.appendChild(moveRightBtn);
	
		  moveLeftBtn.onclick = function () {
			if (instance.data.chartOptMain.scales.x.min >= step) {
			  instance.data.chartOptMain.scales.x.min -= step;
			  instance.data.chartOptMain.scales.x.max -= step;
			  moveRightBtn.style.display = "block";
			  if (instance.data.chartOptMain.scales.x.min <= -2) {
				moveLeftBtn.style.display = "none";
			  }
			} else {
			  instance.data.chartOptMain.scales.x.min = -2;
			  instance.data.chartOptMain.scales.x.max = step;
			  moveLeftBtn.style.display = "none";
			  moveRightBtn.style.display = "block";
			}
			instance.data.chart.update();
		  };
		  moveRightBtn.onclick = function () {
			let suma = instance.data.chartOptMain.scales.x.max + step;
			if (suma <= orgMax) {
			  instance.data.chartOptMain.scales.x.min =
				instance.data.chartOptMain.scales.x.max;
			  instance.data.chartOptMain.scales.x.max += step;
			} else {
			  instance.data.chartOptMain.scales.x.min = orgMax - step;
			  instance.data.chartOptMain.scales.x.max = orgMax + 2;
			  moveRightBtn.style.display = "none";
			}
	
			if (instance.data.chartOptMain.scales.x.min == -2) {
			  moveLeftBtn.style.display = "none";
			} else {
			  moveLeftBtn.style.display = "block";
			}
			instance.data.chart.update();
		  };
		} else {
		  allChildren[1].style.top = `${
			(instance.data.chart.chartArea.bottom -
			  instance.data.chart.chartArea.top) /
			  2 -
			14 +
			instance.data.chart.chartArea.top
		  }px`; //`${mchart.height/2 - 20}px`;
		}
	  }
	} else if (
	  instance.data.chartTypeMain == "bubble" &&
	  instance.data.instanceContainerMain.clientWidth >= 478
	) {
	  instance.data.chartOptMain.layout.padding = {
		left: 10,
		right: 10,
		top: 10,
		bottom: 10,
	  };
  
	  instance.data.chart.config._config.options.maintainAspectratio = true;
	  instance.data.chart._aspectRatio = 1.4;
	  instance.data.chart.config._config.options.scales.x.min = -2;
	  instance.data.chart.config._config.options.scales.x.max =
		instance.data.maxYEARSBubble + 2;
	  instance.data.instanceContainerMain
		.querySelectorAll(".moveBTN")
		.forEach((e) => e.remove());
	  instance.data.chart.resize();
	  instance.data.chart.update();
	}
	if (
		instance.data.chartTypeMain == "line2"	 || 	instance.data.chartTypeMain == "lineNew"
	  ) {
		document.getElementById(
		  instance.data.selectDisplayMainIDLine2
		).style.right = `0px`;
		document.getElementById(
		  instance.data.selectDisplayIDLine2
		).style.right = `0px`;
		document.getElementById(
		  instance.data.selectDisplayMainIDLine2
		).style.left = `${properties.bubble.width() - 90}px`;
		document.getElementById(instance.data.selectDisplayIDLine2).style.left = `${
		  properties.bubble.width() - 90
		}px`;
		instance.data.chart.update();
	  }
	  
	  if (chartType == "line2" || chartType == "lineNew") {
		document.getElementById(instance.data.selectDisplayMainIDLine2).onclick =
		  function () {
			selectDisplay.style.display = "block";
			mchart.update();
		  };
		document.getElementById(instance.data.selectDisplayIDLine2).onclick =
		  function () {
			selectDisplay.style.display = "none";
			if (selectDisplayMain.innerHTML == "Quarter ˅") {
			  selectDisplayMain.innerHTML = "Year ˅";
			  selectDisplay.innerHTML = "Quarter";
			  let lblYears = [];
			  for (label in instance.data.parsedDatasetLabels) {
				let data = instance.data.parsedDatasetLabels[label].substring(0, 4);
				if (!lblYears.includes(data) && data != " ") {
				  lblYears.push(data);
				}
			  }
	  
			  let currLabels = instance.data.parsedDatasetLabels;
			  let datasetData = instance.data.parsedDataset1rNPVMain;
			  let currLabelsReversed = [];
			  
			  currLabelsReversed = currLabels
			  if(chartType == "lineNew"){
				if(instance.data.testHacky0 < 1){
					currLabelsReversed = currLabels.reverse();	
					instance.data.testHacky0 +=24;
				  }else{
					currLabelsReversed = currLabels
				  }
			  }

			

			  let fullYears2mage = [];
			  let fullYears2mage2 =  [];
			  let fullYearData =  [];
			  for (let i = 0; i < currLabels.length; i++) {
				let data = currLabels[i].substring(0, 4);
				if(!fullYears2mage.includes(data)) {
				  fullYears2mage.push(data);
				  const found = currLabelsReversed.find((element) => element.includes(data));
				  let lengthorginal = currLabels.length-1;
				  const found2= currLabelsReversed.indexOf(found);
				  let le = lengthorginal - found2
				  fullYears2mage2.push(le)
				}
			  }
	
	  
			 for (let i = 0; i < fullYears2mage2.length; i++) {
				let e = fullYears2mage2[i];
			  	fullYearData.push(datasetData[0][fullYears2mage2[i]])
			 }
			 let dataM = [];

			  if(parsedData.mode != "latest"){
			  
				let newDataSet = [];
			  let newDataSetLabels = [];
			  let datasetData12 = instance.data.parsedDataset1rNPVMain;
			  let newDataSet12 = [];
	  
			  for (let j = 0; j < lblYears.length; j++) {
				let dataAmm = 0;
				let dataAmm2nd = 0;
				let dataAmm2 = 0;
				for (let i = 0; i < datasetData.length; i++) {
				  let currLabel = currLabels[i];
				  if (currLabel.includes(lblYears[j])) {
					dataAmm += datasetData[i];
					dataAmm2nd += datasetData[i];
					dataAmm2 += datasetData12[i];
				  }
				}
				newDataSetLabels.push(lblYears[j]);
				newDataSet.push(dataAmm);
				newDataSet12.push(dataAmm2);
			  }
	  
			  let currLabelse = instance.data.mainDateQuarters2e;
			  let datahh = instance.data.line2DataSetOrg[0];
	  
			  let dinkleh = [];
			  let dinklehCont = [];
	  
			  for (let a = 0; a < datahh; a++) {
				dinkleh = [];
	  
				for (let j = 0; j < lblYears.length; j++) {
				  let dataAmm = 0;
				  for (let i = 0; i < datahh.length; i++) {
					let currLabel = currLabelse[i];
	  
					if (currLabel.includes(lblYears[j])) {
					  dataAmm += datahh[i];
					}
				  }
				  dinkleh.push(dataAmm);
				}
	  
				dinklehCont.push(dinkleh);
				chartData.datasets[0].data = dinklehCont[0];
	
			  }
			
			  for (let i = 0; i < lblYears.length; i++) {
				let dta = 0;
				for (let j = 0; j < chartData.datasets[0].data.length; j++) {
				  if (currLabelse[j].includes(lblYears[i])) {
					dta += parseFloat(chartData.datasets[0].data[j]);
				  }
				}
				dataM.push(dta);
			  }
			  }
			  let fullReversed = fullYears2mage;
			  let fullYearReversed = fullYearData;
			  if(chartType == "lineNew"){
			  	 fullReversed = fullYears2mage.reverse();
			  	 fullYearReversed = fullYearData.reverse();
			  }

			  if(parsedData.mode == "latest"){
				if(chartType == "lineNew"){
					let newIndex = -10;
					let oldIndex = -10;
					if(instance.data.lineNewUpdt == 1){
						instance.data.testHacky1 = 21

					}
					for(let i = 0; i<fullReversed.length;i++){
						if(fullReversed[i] == instance.data.specialOldIndexYear){
							oldIndex = i;
						}else if(fullReversed[i] == instance.data.specialNewIndexYear){
							newIndex = i;
						}
					}
					instance.data.newIndex = newIndex
					instance.data.oldIndex = oldIndex

					let colorarr = [];
					let colorarrB = [];
					for(let i =0;i<chartData.datasets[0].data.length;i++){
						if(i == newIndex){
							colorarr.push("rgba(245, 159, 38, 1)")	
							colorarrB.push("rgba(245, 159, 38, 1)")	
						}else if(i == oldIndex){
							colorarr.push("#7BD6F2")	
							colorarrB.push("#7BD6F2")	
						}else{
							colorarr.push("#F59F26")	
							colorarrB.push("#FFF")	
						}
					}
					chartData.datasets[0].borderColor = colorarr;
					chartData.datasets[0].backgroundColor = colorarrB;
				}


				chartData.datasets[0].data = fullYearReversed;
				chartData.labels = fullReversed;
				newDataSet1ForTooltipr = fullYearReversed;

				}else{

				chartData.datasets[0].data = dataM;
				chartData.labels = fullYears2mage;
				newDataSet1ForTooltipr = dataM;
			  }

			  yearorquarterhandler = 2;
			  if(parsedData.mode == "pipeline"){
				let dataHem = [];
				for(let i = 0; i<instance.data.mainDateQuarters2e.length;i++){

					let data = instance.data.mainDateQuarters2e[i].substring(0, 4);
					dataHem.push(data)
				}
				chartData.labels = dataHem;
			  yearorquarterhandler = 1;
			  chartData.datasets[0].data = instance.data.line2DataSetOrg[0];
				} 
			  mchart.update();
			} else {
				if(chartType == "lineNew"){
					
					if(instance.data.testHacky1 == 21){
						instance.data.mainDateQuarters2e.reverse();
						instance.data.testHacky1 = 0;
						instance.data.testHacky0 = 0;
					  }
					
					

					if(parsedData.mode != 'pipeline'){
						let newIndex = -10;
						let oldIndex = -10;
						
						for(let i = 0; i<instance.data.mainDateQuarters2e.length;i++){
							if(instance.data.mainDateQuarters2e[i] == instance.data.specialOldIndexQ){
								oldIndex = i;
							}else if(instance.data.mainDateQuarters2e[i] == instance.data.specialNewIndexQ){
								newIndex = i;
							}
						}
						instance.data.newIndex = newIndex
						instance.data.oldIndex = oldIndex
						let colorarr = [];
						let colorarrB = [];
						for(let i =0;i<instance.data.line2DataSetOrg[0].length;i++){
							if(i == newIndex){
								colorarr.push("rgba(245, 159, 38, 1)")	
								colorarrB.push("rgba(245, 159, 38, 1)")	
							}else if(i == oldIndex){
								colorarr.push("#7BD6F2")	
								colorarrB.push("#7BD6F2")	
							}else{
								colorarr.push("#F59F26")	
								colorarrB.push("#FFF")	
							}
						}
	
						chartData.datasets[0].borderColor = colorarr;
						chartData.datasets[0].backgroundColor = colorarrB;
					}


				}
			  chartData.labels = instance.data.mainDateQuarters2e;
			  chartData.datasets[0].data = instance.data.line2DataSetOrg[0]
			  yearorquarterhandler = 1;
	  
			  if(parsedData.mode == "pipeline"){
				chartData.labels = instance.data.mainDateQuarters2e;
				chartData.datasets[0].data = instance.data.line2DataSetOrg[0]
			  }


			  mchart.update();
	  
			  selectDisplayMain.innerHTML = "Quarter ˅";
			  selectDisplay.innerHTML = "Year";
			}
			instance.data.yearorquarterhandler = yearorquarterhandler;
		  };
	  }





	  var parsedDataa2 = JSON.parse(properties.datajson);
	  var chartTypeUpdateable = parsedDataa2.type; 
	  if (chartTypeUpdateable == "groupedBar" && properties.bubble.width() < 870 && properties.bubble.width() > 759) {
		instance.data.specialidhereoptions.scales.x.max = 9;
		instance.data.specialidhere.update();
		deleteMoveButtons()
		moveButtons23(9)
		}else if(chartTypeUpdateable == "groupedBar" && properties.bubble.width() < 760&& properties.bubble.width() > 549){
			instance.data.specialidhereoptions.scales.x.max = 6;
			instance.data.specialidhere.update();
			deleteMoveButtons()
			moveButtons23(6)
		}else if(chartTypeUpdateable == "groupedBar" && properties.bubble.width() < 550){
			instance.data.specialidhereoptions.scales.x.max = 3;
			instance.data.specialidhere.update();
			deleteMoveButtons()
			moveButtons23(3)
		}else if(chartTypeUpdateable == "groupedBar" && properties.bubble.width() > 869){
			instance.data.specialidhereoptions.scales.x.max = 11;
			instance.data.specialidhere.update();
			deleteMoveButtons()
			moveButtons23(11)
		}

		function moveButtons23(stepAdd) {
			let step = 5;
		
			if (stepAdd !== 0) {
			  step = stepAdd;
			}
		
			let allChildren = instance.data.instanceContainerisa.querySelectorAll(".moveBTN");
			let moveRightBtnID = 0;
			if (allChildren.length == 0) {
			  var moveLeftBtn = document.createElement("button");
			  moveLeftBtn.classList.add("moveBTN");
			  var moveLeftBtnID = makeid(20);
			  moveLeftBtn.id = moveLeftBtnID;
			  moveLeftBtn.innerHTML = ""; 											
			  moveLeftBtn.style.position = "absolute";
			  moveLeftBtn.style.top = `${instance.data.specialidhere.height / 2 - 20}px`;
			  moveLeftBtn.style.left = `5px`;
			  moveLeftBtn.style.display = "none";
			  moveLeftBtn.style.height = "40px";
			  moveLeftBtn.style.width = "40px";
			  moveLeftBtn.style.zIndex = "10";
		
			  var moveRightBtnInner = document.createElement("button");
			  moveRightBtnInner.classList.add("specialArrowBtnMove");
			  moveRightBtnInner.style.position = "relative";
			  moveRightBtnInner.style.top = `0px`;
			  moveRightBtnInner.style.left = "-1px";
			  moveRightBtnInner.style.zIndex = "10";
			  moveRightBtnInner.style.display = "block";
		
			  var moveweLeftBtnInner = document.createElement("button");
			  moveweLeftBtnInner.classList.add("specialArrowBtnMoveLeft");
			  moveweLeftBtnInner.style.position = "relative";
			  moveweLeftBtnInner.style.top = `0px`;
			  moveweLeftBtnInner.style.left = "3px";
			  moveweLeftBtnInner.style.zIndex = "10";
			  moveweLeftBtnInner.style.display = "block";
		
			  var moveRightBtn = document.createElement("button");
			  moveRightBtn.classList.add("moveBTN");
			  moveRightBtn.innerHTML = "";
			  moveRightBtn.style.position = "absolute";
			  moveRightBtn.style.top = `${instance.data.specialidhere.height / 2 - 20}px`;
			  moveRightBtnID = makeid(20);
			  moveRightBtn.id = moveRightBtnID;
			  instance.data.moveRightBtnID = moveRightBtnID;
			  instance.data.moveRightBtn = moveRightBtn;
			  moveRightBtn.style.right = "5px";
			  moveRightBtn.style.zIndex = "10";
			  moveRightBtn.style.display = "block";
			  moveRightBtn.style.height = "40px";
			  moveRightBtn.style.width = "40px";
		
			  moveRightBtn.appendChild(moveRightBtnInner);
			  moveLeftBtn.appendChild(moveweLeftBtnInner);
			  instance.data.instanceContainerisa.appendChild(moveLeftBtn);
			  instance.data.instanceContainerisa.appendChild(moveRightBtn);
		
			  moveLeftBtn.onclick = function () {
				if (instance.data.specialidhereoptions.scales.x.min >= step) {
					instance.data.specialidhereoptions.scales.x.min -= step;
					instance.data.specialidhereoptions.scales.x.max -= step;
				  moveRightBtn.style.display = "block";
				  if (instance.data.specialidhereoptions.scales.x.min <= 0) {
					moveLeftBtn.style.display = "none";
				  }
				} else {
					instance.data.specialidhereoptions.scales.x.min = 0;
					instance.data.specialidhereoptions.scales.x.max = step;
				  moveLeftBtn.style.display = "none";
				  moveRightBtn.style.display = "block";
				}
		
				instance.data.specialidhere.update();
			  };

			  moveRightBtn.onclick = function () {
				if ((instance.data.specialidhereoptions.scales.x.min = 0)) {
				  moveLeftBtn.style.display = "none";
				} else {
				  moveLeftBtn.style.display = "block";
				}
				let suma = instance.data.specialidhereoptions.scales.x.max + step;
				if (suma >= instance.data.specialidhereData.datasets[0].data.length) {
					instance.data.specialidhereoptions.scales.x.min = instance.data.specialidhereData.datasets[0].data.length - step;
					instance.data.specialidhereoptions.scales.x.max = instance.data.specialidhereData.datasets[0].data.length;
				  moveRightBtn.style.display = "none";
				} else {
					instance.data.specialidhereoptions.scales.x.min = instance.data.specialidhereoptions.scales.x.max;
					instance.data.specialidhereoptions.scales.x.max += step;
				}
				instance.data.specialidhere.update();
			  };
			}
		
			// if (chartData.datasets[0].data.length > 12) {
			//   if (allChildren[1] !== undefined) {
			// 	allChildren[0].style.display = "block";
			// 	allChildren[1].style.display = "block";
			//   }
			// }
		  }
		  

		function deleteMoveButtons() {
			let allChildren = instance.data.instanceContainerisa.querySelectorAll(".moveBTN");
			allChildren.forEach((el) => el.remove());
		  }
	}
	