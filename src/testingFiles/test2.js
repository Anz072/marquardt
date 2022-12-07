function(instance, context) {
    instance.data.runOnce = false;
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
        function numberWithSpaces(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    };
    
        
        instance.data.testIdvar = makeid(20);
       // var yearsArr = properties.jsondta1.split(",").map(Number);
      //  var locationArr = properties.jsondta2.split(",").map(Number);
     //   var purchaseArr = properties.jsondta3.split(",").map(Number);
     instance.data.labelName = "B";
     instance.data.footerName= "A";
        let mainCanvas = document.createElement("CANVAS");
        let mainCanvasID = instance.data.testIdvar;
        mainCanvas.id = instance.data.testIdvar;
        mainCanvas.style.width = "100%";
        mainCanvas.style.height = "100%";
        instance.canvas[0].appendChild(mainCanvas);
    
        let chartData = {
          labels: ['a','b','c','d','e','f'],
          datasets: [
            {
              label: "Location",
              data: [2,3,4,5,6],
              fill: false,
              borderColor: "#3C52A8",
              pointBackgroundColor: "#3C52A8",
              tension: 0.1,
            },
            {
              label: "Achat",
              data: [2,3,4,5,6],
              fill: false,
              borderColor: "#3CA84C",
              pointBackgroundColor: "#3CA84C",
              tension: 0.1,
            },
          ],
        };
    
        let chartOptions = {
          scales:{
            x: {
              grid: {
                display: false
              },
              title:{
                display: true,
                text:"Years",
                align: 'center',
                color: '#2A2A2A',
                font: {
                  size: 15,
                },
               }
            },
            y: {
              grid: {
                borderDash: [2, 2],
              },
              title:{
                display: true,
                text:"Value",
                align: 'center',
                color: '#2A2A2A',
                font: {
                  size: 15,
                },
                
               },
                   ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            return value + ' $';
                        },
                   },
    
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: true,
            position: "top",
            labels: {
              boxWidth: 15,
              boxHeight: 15,
              fontColor: "black",
            },
          },
          plugins: {
            tooltip: {
              backgroundColor: "#FFF",
              bodyColor: "#000000",
              borderColor: "#c3c3c3",
              borderWidth: 1,
              borderRadius: 3,
              titleAlign: "left",
              titleColor: '#000',
              bodySpacing: 5,
              bodyFont: {
                size: 12,
                weight: 500,
    
              },
              footerFont: {
                size: 12,
                weight: 500,
    
              },
              titleFont:{
                size: 13,
                weight: 600,
    
              },
              padding: {
                left: 10,
                right: 10,
                top: 6,
                bottom: 6, //
              },
                footerColor: '#000',
              displayColors: false,
              callbacks: {
                  title: function (context) {
                  return context[0].dataset.label
                },
                label: function (context) {
                  return `${instance.data.labelName}: `+context.parsed.x
                },
                footer: function(context){
                    return `${instance.data.footerName}: ` + numberWithSpaces(context[0].parsed.y)+'$';
                },
              },
              yAlign: "bottom",
              xAlign: "center",
            },
          }
        };
        let chartPlugin = {};
        const ctx = document.getElementById(mainCanvasID).getContext("2d");
        //================================= Chart Generator
            instance.data.chartData = chartData;
        instance.data.chartOptions = chartOptions;
        instance.data.chartPlugin = chartPlugin;
    
        var mchart = new Chart(ctx, {
          type: "line",
          data: instance.data.chartData,
          options: instance.data.chartOptions,
          plugins: instance.data.chartPlugin,
        });
        instance.data.chart = mchart;
    
    }