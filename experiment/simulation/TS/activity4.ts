function activity4() {
	pp.clearleftpannel();
	pp.clearrightpannel();

	pp.addoffcanvas(3);
	pp.showtitle(
		'<p id="exp-title">Newton’s ring experiment to determine the wavelength of light</p>',
		3
	);

    pp.showdescription(
        `<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(0.5vw + 12px);">
            <p>R = ${selected_r} cm</p>
            <p>Left Total Reading = (Left MSR * 0.05) + (Left VSR * 0.001)</p>
            <p>Right Total Reading = (Right MSR * 0.05) + (Right VSR * 0.001)</p>
        </div>`,
		3
    );

    let right_panel_text = `

    `;

    // let col_heading = [`n`, 'Diameter', 'Radius', 'Main Scale (0.05)', 'Vernier Scale (0.001)', 'Total Reading ((MSR*0.05) + (VSR*0.002))', 'Check'];

    // let verify_row = [['1', user_data[1-1][1].toFixed(3), (user_data[1-1][1]/2).toFixed(3), `${user_data[1-1][3]}`,`${user_data[1-1][4]}`, `<input class='form-control' id='totalb-inp'>`, `<input class='btn btn-primary' onclick='verify_bright();' value='Verify' >`]];

	// let table_2 = new Table2(
	// 	col_heading,
	// 	verify_row,
	// 	'head2',
	// 	'body2',
	// 	`Bright Ring for lamda =  ${selected_color_lambda} and R = ${selected_r}`
	// );

    // let table_2 = new Table2(col_heading, verify_row, "head2", "body2", `Bright Ring for lamda =  ${selected_color_lambda} and R = ${selected_r}`);

    // pp.addtoleftpannel(table_2.template);

    // table_2.draw();

    add_multi_row_input_table();
}

function verify_bright() {
	let val3: HTMLInputElement = <HTMLInputElement>(
		document.getElementById(`totalb-inp`)
	);

	if (!verify_values(parseFloat(val3.value), user_data[0][1])) {
		alert(`please enter total Reading value again`);
		return;
	}

	alert('All Entered Values are correct!!');

	let tab_2_complete = [];

	for (let i = 0; i < 8; i++) {
		tab_2_complete[i] = [];
		tab_2_complete[i][0] = user_data[i][0].toString();
		tab_2_complete[i][1] = user_data[i][3].toString();
		tab_2_complete[i][2] = user_data[i][4].toString();
		tab_2_complete[i][3] = user_data[i][1].toFixed(3);
		tab_2_complete[i][4] = (user_data[i][1] / 2).toFixed(3);
		// tab_2_complete[i][5] = user_data[i][5].toFixed(3);
	}

	pp.clearleftpannel();

	let col_heading = [
		`n`,
		'Main Scale (0.05)',
		'Vernier Scale (0.002)',
		'Diameter',
		'Radius',
	];

	// let table_2 = new Table2(
	// 	col_heading,
	// 	tab_2_complete,
	// 	'head2',
	// 	'body2',
	// 	`Bright Ring for lamda =  ${selected_color_lambda} and R = ${selected_r}`
	// );

	// pp.addtoleftpannel(table_2.template);

	// table_2.draw();

	pp.showdescription(
		'<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(0.5vw + 12px);">Click Next to calculate the value of wavelength</div>',
		3
	);

	var bsOffcanvas = new bootstrap.Offcanvas(
		document.getElementById('offcanvasRight3')
	);
	bsOffcanvas.show();

	// let btn = `<button id="panel1_btn" class="btn btn-primary" onclick="activity5();" style="position: absolute; bottom: 12vh; width: 85%;">Next</button>`;


    let table_2 = new Table2(col_heading, tab_2_complete, "head2", "body2", `Bright Ring for lamda =  ${selected_color_lambda} and R = ${selected_r}`);

   // pp.addtoleftpannel(table_2.template);

   // table_2.draw();

    //add a new table


    

    pp.showdescription('<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(0.5vw + 12px);">Click next to calculate value of wavelength </div>', 3);

    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasRight3"));
    bsOffcanvas.show();

    let btn = `<button id="panel1_btn" class="btn btn-primary" onclick="activity5();" style="position: absolute; bottom: 12vh; width: 85%;">Next</button>`;

    pp.addtorightpannel(btn, 3);


}

function add_multi_row_input_table() {

    let heading_row = ['Ring Number N', 'Left MSR (0.05)', 'Left VSR (0.001)', 'Left TR', 'Right MSR (0.05)', 'Right VSR (0.001)', 'Right TR', 'Diameter'];

    let all_rows = [];

    for(let i=0; i<4; i++) {
        console.log('here');
        
        all_rows.push([i.toString(),
        user_readings[i][1],
        user_readings[i][2],
        `<input class='form-control' id='ltv-${i}' />`,
       user_readings[i][3],
       user_readings[i][4],
        `<input class='form-control' id='rtv-${i}' />`,
        `<input class='form-control' id='dia-${i}' />`, 
    ]);
    }

    console.log(all_rows);
    

    let table_obj = new Table3(heading_row, all_rows);
    pp.addtoleftpannel(table_obj.template);



    table_obj.draw();

    let btn: HTMLDivElement = <HTMLDivElement> document.createElement('div');
    btn.innerHTML = `<button class='btn btn-info' style='width: 30vw;'>Verify</button>`

    pp.addtoleftpannel(`<button class='btn btn-info' style='width: 30vw;' onclick='complete_multi_row_table();' >Verify</button>`);
}


function complete_multi_row_table() {


    let col_1_1: HTMLInputElement = <HTMLInputElement> document.getElementById('ltv-0');
    let col_2_1: HTMLInputElement = <HTMLInputElement> document.getElementById('rtv-0');
    let col_3_1: HTMLInputElement = <HTMLInputElement> document.getElementById('dia-0');

    let col_1_2: HTMLInputElement = <HTMLInputElement> document.getElementById('ltv-1');
    let col_2_2: HTMLInputElement = <HTMLInputElement> document.getElementById('rtv-1');
    let col_3_2: HTMLInputElement = <HTMLInputElement> document.getElementById('dia-1');

    let col_1_3: HTMLInputElement = <HTMLInputElement> document.getElementById('ltv-2');
    let col_2_3: HTMLInputElement = <HTMLInputElement> document.getElementById('rtv-2');
    let col_3_3: HTMLInputElement = <HTMLInputElement> document.getElementById('dia-2');

    let col_1_4: HTMLInputElement = <HTMLInputElement> document.getElementById('ltv-3');
    let col_2_4: HTMLInputElement = <HTMLInputElement> document.getElementById('rtv-3');
    let col_3_4: HTMLInputElement = <HTMLInputElement> document.getElementById('dia-3');
   


    let heading_row = ['Ring Number N', 'Left MSR (0.05)', 'Left VSR (0.001)', 'Left TR', 'Right MSR (0.05)', 'Right VSR (0.001)', 'Right TR', 'Diameter'];

    let all_rows = [];

    for(let i=0; i<8; i++) {
        console.log('here');
        
        all_rows.push([i.toString(),
        user_readings[i][1],
        user_readings[i][2],
        ((parseInt(user_readings[i][1])*0.05) + (parseInt(user_readings[i][2])*0.001)).toString(),
       user_readings[i][3],
       user_readings[i][4],
       ((parseInt(user_readings[i][3])*0.05) + (parseInt(user_readings[i][4])*0.001)).toString(),
       ((parseInt(user_readings[i][1])*0.05) + (parseInt(user_readings[i][2])*0.001) + (parseInt(user_readings[i][3])*0.05) + (parseInt(user_readings[i][4])*0.001)).toString()
    ]);
    }

    console.log(all_rows);
    


    //verify

    if(!verify_values(parseFloat(col_1_1.value), parseFloat(all_rows[0][3]))) {
        console.log(parseInt(col_1_1.value), parseFloat(all_rows[0][3]));
        
        alert('Left TR is incorrect in first trow');
        return;
    } if(!verify_values(parseFloat(col_2_1.value), parseFloat(all_rows[0][6]))) {
        alert('Right TR is incorrect in first row');
        return;
    } if(!verify_values(parseFloat(col_3_1.value), parseFloat(all_rows[0][7]))) {
        alert('Diameter is incorrect in first row');
        return;
    }


    if(!verify_values(parseFloat(col_1_2.value), parseFloat(all_rows[1][3]))) {
        alert('Left TR is incorrect in second trow');
        return;
    } if(!verify_values(parseFloat(col_2_2.value), parseFloat(all_rows[1][6]))) {
        alert('Right TR is incorrect in second row');
        return;
    } if(!verify_values(parseFloat(col_3_2.value), parseFloat(all_rows[1][7]))){
        alert('Diameter is incorrect in second row');
        return;
    }


    if(!verify_values(parseFloat(col_1_3.value), parseFloat(all_rows[2][3]))) {
        alert('Left TR is incorrect in third trow');
        return;
    } if(!verify_values(parseFloat(col_2_3.value), parseFloat(all_rows[2][6]))) {
        alert('Right TR is incorrect in third row');
        return;
    } if(!verify_values(parseFloat(col_3_3.value), parseFloat(all_rows[2][7]))) {
        alert('Diameter TR is incorrect in third row');
        return;
    }


    if(!verify_values(parseFloat(col_1_4.value), parseFloat(all_rows[3][3]))) {
        alert('Left TR is incorrect in third trow');
        return;
    } if(!verify_values(parseFloat(col_2_4.value), parseFloat(all_rows[3][6]))) {
        alert('Right TR is incorrect in third row');
        return;
    } if(!verify_values(parseFloat(col_3_4.value), parseFloat(all_rows[3][7]))) {
        alert('Diameter TR is incorrect in third row');
        return;
    }




    alert('all values are correct');


    console.log(all_rows);

    verified_data = all_rows;

    pp.clearleftpannel();
    

    let table_obj = new Table3(heading_row, all_rows);
    pp.addtoleftpannel(table_obj.template);

    table_obj.draw();

    let btn: HTMLDivElement = <HTMLDivElement> document.createElement('div');
    btn.innerHTML = `<button class='btn btn-info' style='width: 30vw;'>Next</button>`

    pp.addtoleftpannel(`<button class='btn btn-info' style='width: 30vw;' onclick='activity5();' >Next</button>`);


}

//activity4();






// function load_table_3() {

//     pp.clearleftpannel();
//     pp.clearrightpannel();

//     pp.addoffcanvas(3);
//     pp.showtitle('Newton’s ring experiment to determine the wavelength of light', 3);

//     let col_heading = [`n`, 'Diameter', 'Radius', 'Main Scale (0.05)', 'Vernier Scale (0.001)', 'Total Reading ((MSR*0.05) + (VSR*0.001))', 'Check'];

//     let verify_row = [[1, user_data[1-1][2].toFixed(3), (user_data[1-1][2]/2).toFixed(3), `${user_data[1-1][6]}`,`${user_data[1-1][7]}`, `<input class='form-control' id='totald-inp'>`, `<input class='btn btn-primary' onclick='verify_dark();' value='Verify' >`]];

//     let table_3 = new Table2(col_heading, verify_row, "head2", "body2", `Dark Ring for lamda =  ${selected_color_lambda} and R = ${selected_r}`);

//     pp.addtoleftpannel(table_3.template);

//     table_3.draw();

// }

// function verify_dark() {
//     let val3: HTMLInputElement = <HTMLInputElement> document.getElementById(`totald-inp`);

//     // if(!verify_values(parseFloat(val3.value), user_data[1-1][8])) {
//     //     alert(`please Total Reading value again`);
//     //     return;
//     // }

//     // alert('All Entered Values are correct!!');

//     let tab_3_complete = [];

//     for(let i=0; i<8; i++) {
//         tab_3_complete[i] = [];
//         tab_3_complete[i][0] = user_data[i][0].toString();
//         tab_3_complete[i][1] = user_data[i][2].toFixed(3);
//         tab_3_complete[i][2] = (user_data[i][2]/2).toFixed(3);
//         tab_3_complete[i][3] = user_data[i][6].toString();
//         tab_3_complete[i][4] = user_data[i][7].toString();
//         tab_3_complete[i][5] = user_data[i][8].toFixed(3);
//     }

//     pp.clearleftpannel();

//     let col_heading = [`n`, 'Diameter', 'Radius', 'Main Scale (0.05)', 'Vernier Scale (0.001)', 'Total Reading (MSR + VSR*LC)'];

//     let table_3 = new Table2(col_heading, tab_3_complete, "head2", "body2", `Dark Ring for lamda =  ${selected_color_lambda} and R = ${selected_r}`);

//     pp.addtoleftpannel(table_3.template);

//     table_3.draw();

// }

//activity4();




