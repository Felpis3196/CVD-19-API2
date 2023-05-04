
google.charts.load("current", {
  packages: ["geochart"],
});

google.charts.setOnLoadCallback(() => {
  fetch("https://covid19-brazil-api.vercel.app/api/report/v1/countries")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Deu merda ai MAPA");
      }
      return response.json();
    })
    .then((data) => {
      const dados = data.data.map(({ country, confirmed }) => [
        country,
        confirmed,
      ]);
      const dadosMapa = new google.visualization.DataTable();
      dadosMapa.addColumn("string", "País");
      dadosMapa.addColumn("number", "Casos Confirmados");
      dadosMapa.addRows(dados);
      const options = {
        backgroundColor: "#81d4fa",
        colorAxis: { colors: ["#fdf07b", "#fee101"] },
      };
      const chart = new google.visualization.GeoChart(
        document.getElementById("regions_div")
      );
      chart.draw(dadosMapa, options);
      console.log("Deu Bom MAPA");
    })
    .catch((error) => {
      console.error(error);
    });
});



google.charts.load("current", { packages: ["corechart"] });

google.charts.setOnLoadCallback(() => {
  fetch("https://covid19-brazil-api.vercel.app/api/report/v1/countries")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Deu merda ai PIZZA");
      }
      return response.json();
    })
    .then((data) => {
      const totalDeaths = data.data.reduce(
        (acc, { deaths }) => acc + deaths,
        0
      );
      const totalConfirm = data.data.reduce(
        (acc, { confirmed }) => acc + confirmed,
        0
      );
      console.log("Total deaths:", totalDeaths);
      console.log("Total confirmados:", totalConfirm);

      const dadosPizza = new google.visualization.DataTable();
      dadosPizza.addColumn("string", "Category");
      dadosPizza.addColumn("number", "Value");
      dadosPizza.addRows([
        ["CONFIRMADOS", totalConfirm],
        ["MORTOS", totalDeaths]
      ]);

      const options = {
        heigth: 400,
      };
      const chart = new google.visualization.PieChart(
        document.getElementById("piechart")
      );
      chart.draw(dadosPizza, options);
    })
    .catch((error) => {
      console.error(error);
    });
});


google.charts.load('current', {'packages':['table']});

google.charts.setOnLoadCallback(() => {
  fetch('https://covid19-brazil-api.vercel.app/api/report/v1')
  .then((response) => {
    if (!response.ok) {
      throw new Error("Deu merda ai TABLE");
    }
    return response.json()
  })
  .then((data) => {
    const dados = data.data.map(({ uf, state, cases, deaths, suspects, refuses}) => [
      uf,
      state,
      cases,
      deaths,
      suspects,
      refuses
    ])
    const dadosTable = new google.visualization.DataTable();
    dadosTable.addColumn('string', 'ID');
    dadosTable.addColumn('string', 'Estado');
    dadosTable.addColumn('number', 'Casos');
    dadosTable.addColumn('number', 'Mortes');
    dadosTable.addColumn('number', 'Suspeitas');
    dadosTable.addColumn('number', 'Descartados');

    

    dadosTable.addRows(dados)

    const options = {
      width: 800
    }
    const table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(dadosTable, options)
    console.log('Deu bom TABLE')
  })
  .catch((error) => console.log(error))
})


