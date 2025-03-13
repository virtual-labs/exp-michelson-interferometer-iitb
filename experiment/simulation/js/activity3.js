let act3_n_rings;
let act3_inter_rings;
let act3_msr = 0;
let act3_table;
let act3_num_of_readings = 0;
let frg_show;
//let prs_show: HTMLInputElement;
let act3_app_pres_show;
let act3_new_row = true;
let act3_tab;
let bt_to_nextactivity = `<button id="panel1_btn" class="btn btn-primary" onclick="experiment_complete();" style="position: absolute; bottom: 12vh; width: 85%;">Next</button>`;
let act3_all_canvas = `
<canvas style="position: absolute; left: 0; top: 0;"  width="500" height="500" id="act3_mycanvas1">

</canvas>

<canvas style="position: absolute; left:3.5vw; top: 2.7vw;" width="500" height="500" id="act3_mycanvas2">

</canvas>

<canvas style="position: absolute; left: 0;" width="500" height="500" id="act3_mycanvas3">

</canvas>
`;
let act3_all_btns = `
<div style='position: absolute; z-index: 5; width: 20vw; top: -20vw; left: 30vw;'>
    <button id='a3-btn-fine-up' style='position: absolute; top: 44vw; left: 44vw; width: 0.2vw; padding: 0vw; margin: 0vw; transform: rotate(90deg);' ><i class="bi bi-skip-start"></i></button>
    <button id='a3-btn-fine-down' style='position: absolute; left: 47vw; top: 46.5vw; width: 1vw; padding: 0vw; margin: 0vw; transform: rotate(270deg);'  ><i class="bi bi-skip-start"></i></button>
    <button id='a3-re-center' style="display: none;"><i class="bi bi-arrows-move"></i></button>
</div>
`;
let act3_readings = `
    <div id='act3-readings' style="position: absolute; top:30vw; left: 80vw; width: 12vw;">
		<p style='margin: 0; font-size: 1.0vw'>Number of Fringes</p>
		<div><input  style='width: 10vw; height: 2vw; font-size: 1.2vw;' id='frg-inp' class='form-control' disabled value='00' /><div>
		<p style='margin: 0; font-size: 1.0vw'>Pressure Reading</p>
		<div><input style='width: 10vw; height: 2vw; font-size: 1.2vw;' id='app-prs-inp' class='form-control' disabled value='00' /><div>
		<div><button onclick='act3_add_readings();' id='a3-add-reading' class='btn btn-success' style='width: 70%; margin: 2px; font-size: 0.8vw;'>Add Reading</button></div>
		<div><button onclick='act3_delete_readings();' class='btn btn-danger' style='width: 70%; margin: 2px; font-size: 0.8vw;'>Delete Reading</button></div>
    </div>
`;
let act3_my_canvas1;
let act3_my_canvas2;
let act3_my_canvas3;
let act3_my_context1;
let act3_my_context2;
let act3_my_context3;
let act3_scene1;
function activity3() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.addoffcanvas(4);
    num_of_readings = 0;
    user_readings = [
        ['1', ' ', ' ', ' ', ' ', ' ', ' '],
        ['2', ' ', ' ', ' ', ' ', ' ', ' '],
        ['3', ' ', ' ', ' ', ' ', ' ', ' '],
        ['4', ' ', ' ', ' ', ' ', ' ', ' '],
        ['5', ' ', ' ', ' ', ' ', ' ', ' '],
        ['6', ' ', ' ', ' ', ' ', ' ', ' '],
        ['7', ' ', ' ', ' ', ' ', ' ', ' '],
        ['8', ' ', ' ', ' ', ' ', ' ', ' ']
    ];
    ;
    pp.showtitle(`<p id="exp-title" style='width: 25vw;'>Note Readings in table</span><p>`, 3);
    pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(0.5vw + 12px);">
	<p>Use the up and down arrows shown on the simulator to turn the screw guage.</p>
	<p>To take reading a certain point click "add readings" button to add directly to the table</p>
	<p>Formula to calculate the refrective index</p>
	$$ Refrective\ Index\ = 1 + \\frac{m \\lambda p}{2 L \\Delta p}$$
	<p>
		Cell length (L) = 7.056 cm <br>
		Laser wavelength (&lambda;) = 632.8 nm <br>
		Atmospheric pressure (p) = 760 torr
	</p>
	</div>`, 3);
    pp.showtitle(`Observation Table`, 4);
    // load reading talble in right panel
    act3_load_table_input();
    show_side_panel();
    pp.addtoleftpannel(act3_all_btns);
    pp.addtoleftpannel(act3_readings);
    pp.addtoleftpannel(act3_all_canvas);
    frg_show = document.getElementById('frg-inp');
    frg_show.value = '00';
    act3_app_pres_show = document.getElementById('app-prs-inp');
    act3_app_pres_show.value = '00';
    act3_my_canvas1 = document.getElementById('act3_mycanvas1');
    act3_my_canvas2 = document.getElementById('act3_mycanvas2');
    act3_my_canvas3 = document.getElementById('act3_mycanvas3');
    act3_my_context1 = act3_my_canvas1.getContext('2d');
    act3_my_context2 = act3_my_canvas2.getContext('2d');
    act3_my_context3 = act3_my_canvas3.getContext('2d');
    act3_scene1 = new Scene_Canvas(act3_my_canvas1);
    act3_scene1.addcanvas(act3_my_canvas2);
    act3_scene1.addcanvas(act3_my_canvas3);
    window.onload = a3_windowresize;
    window.onresize = a3_windowresize;
    setTimeout(act3_draw_all_canvas, 500);
    setTimeout(() => { MathJax.typeset(); }, 200);
    a3_windowresize();
}
function act3_draw_all_canvas() {
    act3_load_canvas3_images();
    act3_load_canvas2_images();
    act3_load_canvas1_images();
    let a3_fine_up_btn = (document.getElementById('a3-btn-fine-up'));
    let a3_fine_down_btn = (document.getElementById('a3-btn-fine-down'));
    let a3_reset = (document.getElementById('a3-re-center'));
    a3_fine_up_btn.addEventListener('click', act3_move_fine_up);
    a3_fine_down_btn.addEventListener('click', act3_move_fine_down);
    a3_reset.addEventListener('click', act3_re_center);
}
function act3_load_canvas1_images() {
    let dark_background = new Chemistry.Custome_image(dark, new Chemistry.Point(470, 460), 860, 860, act3_my_canvas1);
    act3_scene1.add(dark_background);
}
function act3_load_canvas2_images() {
    let d = [];
    for (let i = 0; i < data.length; i++) {
        d[i] = data[i][1];
    }
    console.log(act3_my_canvas2.width, act3_my_canvas2.height);
    inter_rings = new Chemistry.Inter_Rings(8, d, selected_ring_color, new Chemistry.Point(act3_my_canvas2.width / (2 * lscale) + 5, act3_my_canvas2.height / (2 * lscale)), act3_my_canvas2);
    inter_rings.color = "red";
    let mscope_img = new Chemistry.Custome_image(mscope, new Chemistry.Point(act3_my_canvas2.width / (2 * lscale), act3_my_canvas2.height / (2 * lscale)), 860, 860, act3_my_canvas2);
    let x_line = new Chemistry.Line(100, act3_my_canvas2.height / (2 * lscale), 700, act3_my_canvas2.height / (2 * lscale), act3_my_canvas2);
    let y_line = new Chemistry.Line(act3_my_canvas2.width / (2 * lscale) + 5, 100, act3_my_canvas2.width / (2 * lscale) + 5, 700, act3_my_canvas2);
    act3_scene1.add(inter_rings);
    act3_scene1.add(mscope_img);
    act3_scene1.add(x_line);
    act3_scene1.add(y_line);
    all_left_readings = inter_rings.all_left_readings;
    console.log(all_left_readings);
    all_right_readings = inter_rings.all_right_readings;
    console.log(all_right_readings);
}
function act3_move_fine_up() {
    inter_rings.shift_fine_up();
    act3_scene1.draw();
    if (inter_rings.n <= 30) {
        act3_current_pressure_reading = parseFloat(pressure_readings[inter_rings.n - 1][1]);
        act3_current_num_of_rings = inter_rings.n;
        act3_current_pres = parseFloat(pressure_readings[inter_rings.n - 1][0]);
        act3_current_pres_change = parseFloat(pressure_readings[inter_rings.n - 1][2]);
        act3_current_refrective_index = parseFloat(pressure_readings[inter_rings.n - 1][4]);
    }
    else {
        alert('maximum number of rings');
    }
    show_pres_scale_reading();
    act3_enable_addvalue_btn();
}
function act3_move_fine_down() {
    inter_rings.shift_fine_down();
    act3_scene1.draw();
    if (inter_rings.n > 0) {
        act3_current_pressure_reading = parseFloat(pressure_readings[inter_rings.n - 1][1]);
        act3_current_num_of_rings = inter_rings.n;
        act3_current_pres = parseFloat(pressure_readings[inter_rings.n - 1][0]);
        act3_current_pres_change = parseFloat(pressure_readings[inter_rings.n - 1][2]);
        act3_current_refrective_index = parseFloat(pressure_readings[inter_rings.n - 1][4]);
    }
    else {
        alert('minimum number of rings');
    }
    show_pres_scale_reading();
    act3_enable_addvalue_btn();
}
function act3_re_center() {
    act3_inter_rings.re_center();
    act3_scene1.draw();
}
function a3_windowresize() {
    //canvas size
    a3_canvas_size();
    //canvas mapping
    a3_canvas_mapping();
    //draw scene
    act3_scene1.draw();
    console.log('done');
}
function a3_canvas_size() {
    act3_my_canvas3.width = window.innerWidth * 0.91;
    act3_my_canvas3.height = ((act3_my_canvas3.width * 1080.0) / 1920) * 0.85;
    lscale = act3_my_canvas3.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        act3_my_canvas3.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
    act3_my_canvas2.width = window.innerWidth * 0.375;
    act3_my_canvas2.height = window.innerWidth * 0.375;
    console.log(act3_my_canvas2.width, act3_my_canvas2.height);
    act3_my_canvas2.style.borderRadius = '50%';
    act3_my_canvas1.width = window.innerWidth * 0.91;
    act3_my_canvas1.height = ((act3_my_canvas1.width * 1080.0) / 1920) * 0.85;
}
function a3_canvas_mapping() {
    act3_my_context1.translate(0, act3_my_canvas1.height);
    act3_my_context1.scale(1, -1);
    act3_my_context2.translate(0, act3_my_canvas2.height);
    act3_my_context2.scale(1, -1);
    act3_my_context3.translate(0, act3_my_canvas3.height);
    act3_my_context3.scale(1, -1);
}
function act3_load_canvas3_images() {
    let pressure_setup_img = new Chemistry.Custome_image(pressure_setup, new Chemistry.Point(1400, 650), 650 * 1.5, 350 * 1.5, act3_my_canvas3);
    act3_scene1.add(pressure_setup_img);
}
function show_pres_scale_reading() {
    act3_app_pres_show.value = act3_current_pressure_reading.toString();
    frg_show.value = act3_current_num_of_rings.toString();
}
function act3_load_table_input() {
    let heading = [
        'Sno.',
        'Atmospheric Pressure',
        'Applied Pressure',
        'Change in Pressure',
        'Number of fringes',
        'Refrective Index'
    ];
    let parent = document.getElementById("pannel4");
    let offcanvasbody = document.getElementById("offcanvasRight4");
    offcanvasbody.style.width = '50vw';
    a3_tab_data = [[null, null, null]];
    let tab = new Verify_Rows_Cols_Custom_Fixed(heading, a3_tab_data, [], [], '', parent, true, true, () => { alert("Success"); }, 5);
    tab.load_table();
    a3_tab_data = [];
}
function act3_load_reading_table() {
    let extra_gear_icon = (document.getElementsByClassName('offcanvasbtn')[1]);
    extra_gear_icon.innerHTML = '<i class="bi bi-table"></i>';
    extra_gear_icon.style.top = 'calc(5vw + 20px)';
    let heading = [
        'Sno.',
        'Atmospheric Pressure',
        'Applied Pressure',
        'Change in Pressure',
        'Number of fringes',
        'Refrective Index'
    ];
    let rows = user_readings;
    tab = new Table(heading, rows);
    table = tab.template;
    pp.addtorightpannel(table, 4);
    tab.draw();
}
function act3_add_readings() {
    let btn = document.getElementById("a3-add-reading");
    let r1 = act3_app_pres_show.value;
    let r2 = frg_show.value;
    let r3 = act3_current_pres;
    let r4 = act3_current_pres_change;
    let r5 = act3_current_refrective_index;
    for (let i = 0; i < a3_tab_data.length; i++) {
        if (a3_tab_data[i][2] == parseInt(r2)) {
            alert("You cannot add the same value again");
            return;
        }
    }
    if (num_of_readings < 5) {
        a3_tab_data.push([]);
        a3_tab_data[num_of_readings].push(num_of_readings + 1);
        a3_tab_data[num_of_readings].push(r3);
        a3_tab_data[num_of_readings].push(parseFloat(r1));
        a3_tab_data[num_of_readings].push(r4);
        a3_tab_data[num_of_readings].push(parseInt(r2));
        a3_tab_data[num_of_readings].push(r5);
        let heading = [
            'Sno.',
            'Atmospheric Pressure',
            'Applied Pressure',
            'Change in Pressure',
            'Number of fringes',
            'Refrective Index'
        ];
        let parent = document.getElementById("pannel4");
        parent.innerHTML = '';
        let tab = new Verify_Rows_Cols_Custom_Fixed(heading, a3_tab_data, [num_of_readings], [[5]], '', parent, true, true, () => { }, 5);
        new_row = true;
        num_of_readings++;
        tab.load_table();
        act3_show_table_panel();
        btn.disabled = true;
    }
    else {
        alert("You have entered 5 readings, you can now move to calculations");
    }
    if (num_of_readings == 5) {
        pp.addtorightpannel(bt_to_nextactivity, 3);
        //act3_complete_reading_table();
        //pp.showdescription('Rest of the table values will be auot filled', 3);
        //show_side_panel();
    }
}
function act3_complete_reading_table() {
    if (num_of_readings == 4) {
        for (let i = 0; i < 4; i++) {
            user_readings[i + 4][1] = all_left_readings[i + 4][0].toFixed(2);
            user_readings[i + 4][2] = all_left_readings[i + 4][1].toFixed(2);
            user_readings[i + 4][3] = all_right_readings[i + 4][0].toFixed(2);
            user_readings[i + 4][4] = all_right_readings[i + 4][1].toFixed(2);
            user_readings[i + 4][5] = ((all_left_readings[i + 4][0] - all_left_readings[i + 4][3] + (all_left_readings[i + 4][2] - all_left_readings[i + 4][4]) * 0.02) / 10).toFixed(3);
        }
    }
}
function act3_delete_readings() {
    if (num_of_readings >= 0) {
        if (new_row && num_of_readings == 0) {
            user_readings[num_of_readings][1] = '';
            user_readings[num_of_readings][2] = '';
            tab.draw();
            act3_show_table_panel();
            return;
        }
        else if (new_row && num_of_readings > 0) {
            num_of_readings--;
            new_row = false;
            user_readings[num_of_readings][3] = '';
            user_readings[num_of_readings][4] = '';
            user_readings[num_of_readings][5] = ' ';
            tab.draw();
            act3_show_table_panel();
            return;
        }
        else if (!new_row && num_of_readings == 0) {
            user_readings[num_of_readings][3] = '';
            user_readings[num_of_readings][4] = '';
            user_readings[num_of_readings][5] = ' ';
            new_row = false;
            tab.draw();
            act3_show_table_panel();
            return;
        }
        else if (!new_row && num_of_readings > 0) {
            user_readings[num_of_readings][1] = '';
            user_readings[num_of_readings][2] = '';
            new_row = true;
            tab.draw();
            act3_show_table_panel();
            return;
        }
    }
    else {
        alert('No input values');
    }
}
function act3_show_table_panel() {
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight4'));
    bsOffcanvas.show();
}
function act3_enable_addvalue_btn() {
    let btn = document.getElementById("a3-add-reading");
    btn.disabled = false;
}
function experiment_complete() {
    alert("Experiment is completed");
}
//activity3();
//# sourceMappingURL=activity3.js.map