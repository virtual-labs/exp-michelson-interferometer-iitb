declare var Chart;

var label = [];
var data_points = [];
var data_points1 = [];
var data_points2 = [];
var pol;
var lambda_exp: number;

var slope;

function activity5() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);

	pp.showtitle(
		`<p id="exp-title" style='width: 25vw;'>Diameter sqauared vs Ring Number<p>`,
		3
	);

	draw_chart();
}

function draw_chart() {
	document.getElementById('hide_panel3').click();

	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);
	pp.addcanvas('myChart');

	if (document.getElementById('panel1_btn')) {
		document.getElementById('panel1_btn').remove();
	}

	// pp.addButtonToRightPanel("hello", print_hello, 3);

	for (let i = 0; i < user_data.length; i++) {
		label.push(user_data[i][0]);
		data_points.push(user_data[i][1] ** 2);
		data_points2.push(data[i][1] ** 2);
	}

	calculate_y_data_pointspoints();
	var ctx = document.getElementById('myChart');
	ctx.style.backgroundColor = 'white';
	ctx.style.marginTop = '5px';
	ctx.style.marginLeft = '10%';
	ctx.style.padding = '10px';
	ctx.style.borderRadius = '8px';
	if (typeof chart != 'undefined') {
		chart.destroy();
	}
	// let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
	// let data_points1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
	// let data_points2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
	var chart = new Chart(ctx, {
		type: 'scatter',
		data: {
			labels: label,
			datasets: [
				{
					label: 'Experimental',
					data: data_points,
					fill: false,
					borderColor: 'blue',
					tension: 0.5,
					showLine: false,
					// yAxisID: 'A',
					// borderWidth: 1,
					// borderColor: "green",
					// backgroundColor: "rgba(34, 139, 34, 0.5)",
				},
				{
					label: 'Best Fit',
					data: data_points1,
					fill: false,
					borderColor: 'red',
					tension: 0.5,
					showLine: true,
					// yAxisID: 'A',
					// borderWidth: 1,
					// borderColor: "red",
					// backgroundColor: "rgba(255, 0, 0, 0.5)",
				},
				{
					label: 'Theoratical',
					data: data_points2,
					fill: false,
					borderColor: 'green',
					tension: 0.5,
					showLine: false,
					// yAxisID: 'A',
					// borderWidth: 1,
					// borderColor: "red",
					// backgroundColor: "rgba(255, 0, 0, 0.5)",
				},
			],
		},
		options: {
			maintainAspectRatio: true,
			scales: {
				y: {
					title: {
						display: true,
						text: 'Diameter Squared',
						font: { size: 14, weight: 'bold' },
					},
				},
				x: {
					title: {
						display: true,
						text: 'Ring Number',
						font: { size: 14, weight: 'bold' },
					},
				},
			},
			plugins: {
				title: {
					display: true,
					text: `Diameter Squared vs Ring Number`,
					font: { size: 18 },
				},
				legend: { labels: { font: { size: 14, weight: 'bold' } } },
			},
		},
	});

	verify_slope_text();
}

function calculate_y_data_pointspoints() {
	pol = regression_linear(label, data_points);

	// console.log(pol);
	for (let i = 0; i < label.length; i++) {
		data_points1.push(pol[0] * label[i] + pol[1]);
	}
	slope = pol[0];
	// calculated_energy_band_gap = Math.abs(0.5036 / slope);
}

function verify_slope_text() {
	pp.showtitle(
		`<p id="exp-title" style='width: 25vw;'>Diameter sqauared vs Ring Number<p>`,
		3
	);
	let text = `
    <div>
        <p>experimental slope = ${slope.toFixed(4)}</p>
		<p>radius of curvature of lens R = ${selected_r}</p>
        <p>$$ \\lambda_{exp} = \\frac{slope}{4 * R}  $$</p>
		<p>$$ \\lambda_{exp} = $$ <input placeholder='Your Answer' class='form-control' id='lambda-inp' /></p>
		<p><button class='btn btn-primary' onclick='verify_lambda();'>Check</button></p>
    </div>
    `;

	pp.showdescription(text, 3);

	MathJax.typeset();
}

function verify_lambda() {
	let ele: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('lambda-inp')
	);
	lambda_exp = slope / (4 * selected_r);
	console.log(lambda_exp);

	if (!verify_values(lambda_exp, parseFloat(ele.value))) {
		alert('Check your lambda calculation again!!');
	}

	pp.clearleftpannel();

	let orignial_value = selected_color_lambda;

	let error = (Math.abs(lambda_exp - orignial_value) / orignial_value) * 100;
	let result = `<span style='color: red;'>The results are not within the acceptance range please perfom the experiment again</span>`;
	if (error < 4) {
		result = `<span style='color: green;'>Experiment Succesfully passed</span>`;
	}

	pp.addtoleftpannel(`
	<div style='text-align: center;'>
	<br>
	<h3>&lambda; for selected color ${selected_ring_color}  = ${(
		orignial_value *
		10 ** 7
	).toFixed(2)}nm</h3>
	<h3>Your experimentally calculated &lambda;<sub>exp</sub>    = ${(
		lambda_exp *
		10 ** 7
	).toFixed(2)}nm</h3>
	<h3>Percentage error = ${(error).toFixed(2)} %</h3>
	<h3>Result => ${result}</h3>
	</div>
	`);
}


