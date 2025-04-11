let n_rings;
let inter_rings;
let msr = 0;
let table;
let num_of_readings = 0;
let msr_show;
let vsr_show;
let lamda_show;
let new_row = true;
let tab;
let fine_up_btn;
let fine_down_btn;
let reset;
//declare var Verify_Rows_Cols_Custom_Fixed_Update1;
let bt_to_activity4 = `<button id="panel1_btn" class="btn btn-primary" onclick="move_to_act4();" style="position: absolute; bottom: 12vh; width: 85%;">Next</button>`;
let all_canvas = `
<canvas style="position: absolute; left: 0; top: 0;"  width="500" height="500" id="mycanvas1">

</canvas>

<canvas style="position: absolute; left:3.5vw; top: 2.7vw;" width="500" height="500" id="mycanvas2">

</canvas>

<canvas style="position: absolute; left: 0;" width="500" height="500" id="mycanvas3">

</canvas>
`;
// let color_dd  = `<div><Select onchange='set_color();' id='color-dd' class="form-select" style='position: absolute; width: 23vw; left: 55vw; top: 10vw; z-index: 5;' ></div>`;
let all_btns = `
<div style='position: absolute; z-index: 5; width: 20vw; top: -20vw; left: 30vw;'>
    <button id='a2-btn-fine-up' style='position: absolute; top: 29vw; left: 54vw; width: 0.2vw; padding: 0vw; margin: 0vw; transform: rotate(90deg);'><i class="bi bi-skip-start"></i></button>
    <button id='a2-btn-fine-down' style='position: absolute; left: 58vw; top: 31.5vw; width: 1vw; padding: 0vw; margin: 0vw; transform: rotate(270deg);'><i class="bi bi-skip-start"></i></button>
    <button id='re-center' style="display: none;"><i class="bi bi-arrows-move"></i></button>
</div>
`;
let readings = `

	<div style="position: absolute; left: 50vw; width: 43vw; height: inherit;">
	<div style="position: relative; width: 100%; height: inherit;">
	<span style="position: absolute; top: 4.5vw; left: 11vw;"  >Fringes</span>
	<span style="position: absolute; top: 15vw; left: 31vw;" >Screw Gauge</span>
	<span style="position: absolute; top: 25.5vw; left: 13vw;" >Immovable Mirror</span>
	<span style="position: absolute; top: 7.2vw; left: 22vw;">Movable Mirror</span>
	<span style="position: absolute; top: 14vw; left: 9vw;" >Beam Splitter</span>
	<span id='f-dsp' style="position: absolute; top: 0.9vw; left: 28vw; z-index: 4;"></span>
	<span id='s-dsp' style="position: absolute; top: 12.5vw; left: 27vw; z-index: 4;"></span>
	</div>
	</div>


    <div id='act2-readings' style="position: absolute; top:30vw; left: 80vw; width: 12vw;">
    <p style='margin: 0; font-size: 1.0vw'>Number of Fringes</p>
    <div><input style='width: 10vw; height: 2vw; font-size: 1.2vw;' id='msr-inp' class='form-control' disabled value='00' /><div>
    <p style='margin: 0; font-size: 1.0vw'>Micrometer Reading</p>
    <div><input style='width: 10vw; height: 2vw; font-size: 1.2vw;' id='vsr-inp' class='form-control' disabled value='00' /><div>
	<div><input style='width: 10vw; height: 3vw; font-size: 1.2vw; display: none' id='lamda-inp' class='form-control' disabled value='00' /><div>
    <div><button onclick='add_readings();' id='add-reading' class='btn btn-success' style='width: 70%; margin: 2px; font-size: 0.8vw;'>Add Reading</button></div>
    <div><button onclick='delete_readings();' class='btn btn-danger' style='width: 70%; margin: 2px; font-size: 0.8vw;'>Delete Reading</button></div>
    </div>
`;
let my_canvas1;
let my_canvas2;
let my_canvas3;
let my_context1;
let my_context2;
let my_context3;
let scene1;
function activity2() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.addoffcanvas(4);
    user_readings = [
        ['1', ' ', ' ', ' ', ' ', ' '],
        ['2', ' ', ' ', ' ', ' ', ' '],
        ['3', ' ', ' ', ' ', ' ', ' '],
        ['4', ' ', ' ', ' ', ' ', ' '],
        ['5', ' ', ' ', ' ', ' ', ' '],
        ['6', ' ', ' ', ' ', ' ', ' '],
        ['7', ' ', ' ', ' ', ' ', ' '],
        ['8', ' ', ' ', ' ', ' ', ' '],
    ];
    pp.showtitle(`<p id="exp-title" style='width: 25vw;'>Note Readings in table</span><p>`, 3);
    pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(0.5vw + 12px);">
    <p>Use the up and down arrows shown on the simulator to turn the screw guage.</p>
    <p>To take reading a certain point click "add readings" button to add directly to the table</p>
     </div>`, 3);
    //let formula = `<br> <div><span> 2 \\times d = m \\times \\lambda </span></div><br>`;
    pp.showtitle(`Observation Table <br><br> <div><span>$$ 2 \\times d = m \\times \\lambda $$</span></div><br> `, 4);
    // load reading talble in right panel
    load_table_input();
    show_side_panel();
    // pp.addtoleftpannel(color_dd);
    pp.addtoleftpannel(all_btns);
    pp.addtoleftpannel(readings);
    pp.addtoleftpannel(all_canvas);
    msr_show = document.getElementById('msr-inp');
    msr_show.value = '00';
    vsr_show = document.getElementById('vsr-inp');
    vsr_show.value = '00';
    lamda_show = document.getElementById('lamda-inp');
    lamda_show.value = '00';
    my_canvas1 = document.getElementById('mycanvas1');
    my_canvas2 = document.getElementById('mycanvas2');
    my_canvas3 = document.getElementById('mycanvas3');
    my_context1 = my_canvas1.getContext('2d');
    my_context2 = my_canvas2.getContext('2d');
    my_context3 = my_canvas3.getContext('2d');
    scene1 = new Scene_Canvas(my_canvas1);
    scene1.addcanvas(my_canvas2);
    scene1.addcanvas(my_canvas3);
    window.onload = a2_windowresize;
    window.onresize = a2_windowresize;
    setTimeout(draw_all_canvas, 500);
    setTimeout(() => {
        MathJax.typeset();
    }, 200);
    a2_windowresize();
    let ele = document.getElementsByClassName('offcanvasbtn')[1];
    ele.style.top = '5vw';
}
function draw_all_canvas() {
    load_canvas3_images();
    load_canvas2_images();
    load_canvas1_images();
    // let right_btn: HTMLButtonElement = <HTMLButtonElement>(
    // 	document.getElementById('a2-btn-right')
    // );
    // let left_btn: HTMLButtonElement = <HTMLButtonElement>(
    // 	document.getElementById('a2-btn-left')
    // );
    // let fine_left_btn: HTMLButtonElement = <HTMLButtonElement>(
    // 	document.getElementById('a2-btn-fine-left')
    // );
    // let fine_right_btn: HTMLButtonElement = <HTMLButtonElement>(
    // 	document.getElementById('a2-btn-fine-right')
    // );
    // let up_btn: HTMLButtonElement = <HTMLButtonElement>(
    // 	document.getElementById('a2-btn-up')
    // );
    fine_up_btn = document.getElementById('a2-btn-fine-up');
    // let down_btn: HTMLButtonElement = <HTMLButtonElement>(
    // 	document.getElementById('a2-btn-down')
    // );
    fine_down_btn = (document.getElementById('a2-btn-fine-down'));
    reset = document.getElementById('re-center');
    // right_btn.addEventListener('click', move_right);
    // left_btn.addEventListener('click', move_left);
    // fine_right_btn.addEventListener('click', move_fine_right);
    // fine_left_btn.addEventListener('click', move_fine_left);
    //up_btn.addEventListener('click', move_up);
    fine_up_btn.addEventListener('click', move_fine_up);
    //down_btn.addEventListener('click', move_down);
    fine_down_btn.addEventListener('click', move_fine_down);
    reset.addEventListener('click', re_center);
}
function a2_windowresize() {
    //canvas size
    a2_canvas_size();
    //canvas mapping
    a2_canvas_mapping();
    //draw scene
    scene1.draw();
    console.log('done');
    // setTimeout(draw_img1_delay, 500);
    // setTimeout(draw_img2_delay, 500);
}
function a2_canvas_size() {
    my_canvas3.width = window.innerWidth * 0.91;
    my_canvas3.height = ((my_canvas3.width * 1080.0) / 1920) * 0.85;
    lscale = my_canvas3.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        my_canvas3.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
    my_canvas2.width = window.innerWidth * 0.375;
    my_canvas2.height = window.innerWidth * 0.375;
    console.log(my_canvas2.width, my_canvas2.height);
    my_canvas2.style.borderRadius = '50%';
    my_canvas1.width = window.innerWidth * 0.91;
    my_canvas1.height = ((my_canvas1.width * 1080.0) / 1920) * 0.85;
}
function a2_canvas_mapping() {
    my_context1.translate(0, my_canvas1.height);
    my_context1.scale(1, -1);
    my_context2.translate(0, my_canvas2.height);
    my_context2.scale(1, -1);
    my_context3.translate(0, my_canvas3.height);
    my_context3.scale(1, -1);
}
function load_canvas3_images() {
    let micrometer_setup_img = new Chemistry.Custome_image(micrometer_setup, new Chemistry.Point(1400, 650), 650 * 1.5, 350 * 1.5, my_canvas3);
    // let holder_img = new Chemistry.Custome_image(
    // 	holder,
    // 	new Chemistry.Point(1400, 770),
    // 	500,
    // 	250,
    // 	my_canvas3
    // );
    // let lens_img = new Chemistry.Custome_image(
    // 	lens,
    // 	new Chemistry.Point(1400, 770),
    // 	500,
    // 	250,
    // 	my_canvas3
    // );
    // scene1.add(holder_img);
    // scene1.add(lens_img);
    scene1.add(micrometer_setup_img);
    // my_context1.beginPath();
    // my_context1.moveTo(1, 1);
    // my_context1.lineTo(200, 200);
    // my_context1.stroke();
}
function load_canvas1_images() {
    let dark_background = new Chemistry.Custome_image(dark, new Chemistry.Point(470, 460), 860, 860, my_canvas1);
    scene1.add(dark_background);
}
function load_canvas2_images() {
    let d = [];
    for (let i = 0; i < data.length; i++) {
        d[i] = data[i][1];
    }
    console.log(my_canvas2.width, my_canvas2.height);
    inter_rings = new Chemistry.Inter_Rings(8, d, selected_ring_color, new Chemistry.Point(my_canvas2.width / (2 * lscale) + 5, my_canvas2.height / (2 * lscale)), my_canvas2);
    inter_rings.color = 'red';
    let mscope_img = new Chemistry.Custome_image(mscope, new Chemistry.Point(my_canvas2.width / (2 * lscale), my_canvas2.height / (2 * lscale)), 860, 860, my_canvas2);
    let x_line = new Chemistry.Line(100, my_canvas2.height / (2 * lscale), 700, my_canvas2.height / (2 * lscale), my_canvas2);
    let y_line = new Chemistry.Line(my_canvas2.width / (2 * lscale) + 5, 100, my_canvas2.width / (2 * lscale) + 5, 700, my_canvas2);
    scene1.add(inter_rings);
    scene1.add(mscope_img);
    scene1.add(x_line);
    scene1.add(y_line);
    all_left_readings = inter_rings.all_left_readings;
    console.log(all_left_readings);
    all_right_readings = inter_rings.all_right_readings;
    console.log(all_right_readings);
}
function move_right() {
    inter_rings.shift_left();
    scene1.draw();
    show_main_scale_reading();
}
function move_left() {
    inter_rings.shift_right();
    scene1.draw();
    show_main_scale_reading();
}
function move_fine_right() {
    inter_rings.shift_fine_left();
    scene1.draw();
    show_main_scale_reading();
}
function move_fine_left() {
    inter_rings.shift_fine_right();
    scene1.draw();
    show_main_scale_reading();
}
function move_up() {
    inter_rings.shift_up();
    scene1.draw();
}
function move_fine_up() {
    inter_rings.shift_fine_up();
    scene1.draw();
    if (inter_rings.n <= 30) {
        current_micrometer_reading = parseFloat(inferometer_readings[inter_rings.n - 1][0]);
        current_num_of_rings = inter_rings.n;
        current_lambda = parseFloat(inferometer_readings[inter_rings.n + 1][2]);
    }
    else {
        alert('maximum number of rings');
    }
    show_micro_scale_reading();
    enable_addvalue_btn();
}
function move_down() {
    inter_rings.shift_down();
    scene1.draw();
}
function move_fine_down() {
    inter_rings.shift_fine_down();
    scene1.draw();
    if (inter_rings.n > 0) {
        current_micrometer_reading = parseFloat(inferometer_readings[inter_rings.n - 1][0]);
        current_num_of_rings = inter_rings.n;
        current_lambda = parseFloat(inferometer_readings[inter_rings.n + 1][2]);
    }
    else {
        alert('minimum number of rings');
    }
    show_micro_scale_reading();
    enable_addvalue_btn();
}
function re_center() {
    inter_rings.re_center();
    scene1.draw();
}
function show_micro_scale_reading() {
    // msr = (inter_rings.stpt.x - inter_rings.center_x) / (inter_rings.multiplier / 2);
    // 	msr = msr / 2;
    // 	let msr_val = Math.floor(parseFloat((msr / 2).toFixed(3)) / 0.05) ;
    // let vsr_val = Math.floor(
    // 	(parseFloat((msr / 2).toFixed(3)) - (msr_val * 0.05)) * 1000
    // );
    vsr_show.value = current_micrometer_reading.toString();
    msr_show.value = current_num_of_rings.toString();
    lamda_show.value = current_lambda.toString();
    document.getElementById('f-dsp').innerHTML = current_num_of_rings.toString();
    document.getElementById('s-dsp').innerHTML = current_micrometer_reading.toString();
}
function show_main_scale_reading() {
    if (inter_rings.center_x <= inter_rings.stpt.x) {
        msr =
            (inter_rings.stpt.x - inter_rings.center_x) /
                (inter_rings.multiplier / 2);
        msr = msr / 2;
        let msr_val = Math.floor(parseFloat((msr / 2).toFixed(3)) / 0.05);
        let vsr_val = Math.floor((parseFloat((msr / 2).toFixed(3)) - msr_val * 0.05) * 1000);
        let lamda_val = current_lambda;
        msr_show.value = msr_val.toString();
        vsr_show.value = vsr_val.toString();
        lamda_show.value = lamda_val.toString();
    }
    else if (inter_rings.center_x > inter_rings.stpt.x) {
        msr =
            (inter_rings.center_x - inter_rings.stpt.x) /
                (inter_rings.multiplier / 2);
        msr = msr / 2;
        let msr_val = Math.floor(parseFloat((msr / 2).toFixed(3)) / 0.05);
        let vsr_val = Math.floor((parseFloat((msr / 2).toFixed(3)) - msr_val * 0.05) * 1000);
        msr_show.value = msr_val.toString();
        vsr_show.value = vsr_val.toString();
    }
}
function load_table_input() {
    let heading = [
        'Sno.',
        'Micrometer Reading',
        'Number of Fringes',
        'Calculate Wavelength (nm)',
    ];
    let parent = (document.getElementById('pannel4'));
    let offcanvasbody = (document.getElementById('offcanvasRight4'));
    offcanvasbody.style.width = '50vw';
    tab_data = [[null, null, null]];
    let tab = new Verify_Rows_Cols_Custom_Fixed(heading, tab_data, [], [], '', parent, true, true, () => {
        alert('Success');
    }, 5);
    tab.load_table();
    tab_data = [];
}
function load_reading_table() {
    let extra_gear_icon = (document.getElementsByClassName('offcanvasbtn')[1]);
    extra_gear_icon.innerHTML = '<i class="bi bi-table"></i>';
    extra_gear_icon.style.top = 'calc(5vw + 20px)';
    let heading = [
        'Sno.',
        'Micrometer Reading',
        'Number of Fringes',
        'Calculate Wavelength (nm)',
    ];
    let rows = user_readings;
    tab = new Table(heading, rows);
    table = tab.template;
    pp.addtorightpannel(table, 4);
    tab.draw();
}
function add_readings() {
    let btn = (document.getElementById('add-reading'));
    let r1 = vsr_show.value;
    let r2 = msr_show.value;
    let r3 = (parseFloat(lamda_show.value) * 1000).toString();
    for (let i = 0; i < tab_data.length; i++) {
        if (tab_data[i][2] == parseInt(r2)) {
            alert('You cannot add the same value again');
            return;
        }
    }
    if (num_of_readings < 5) {
        tab_data.push([]);
        tab_data[num_of_readings].push(num_of_readings + 1);
        tab_data[num_of_readings].push(parseFloat(r1));
        tab_data[num_of_readings].push(parseInt(r2));
        tab_data[num_of_readings].push(parseFloat(r3));
        let heading = [
            'Sno.',
            'Micrometer Reading',
            'Number of Fringes',
            'Calculate Wavelength (nm)',
        ];
        let parent = (document.getElementById('pannel4'));
        parent.innerHTML = '';
        let tab = new Verify_Rows_Cols_Custom_Fixed(heading, tab_data, [num_of_readings], [[3]], '', parent, true, true, () => { }, 5);
        new_row = true;
        num_of_readings++;
        tab.load_table();
        show_table_panel();
        btn.disabled = true;
    }
    else {
        alert('You have entered 5 readings, you can now move to calculations');
    }
    if (num_of_readings == 5) {
        pp.addtorightpannel(bt_to_activity4, 3);
        //complete_reading_table();
        //pp.showdescription('Rest of the table values will be auot filled', 3);
        //show_side_panel();
    }
}
function enable_addvalue_btn() {
    let btn = (document.getElementById('add-reading'));
    btn.disabled = false;
}
function complete_reading_table() {
    if (num_of_readings == 4) {
        for (let i = 0; i < 4; i++) {
            user_readings[i + 4][1] = all_left_readings[i + 4][0].toFixed(2);
            user_readings[i + 4][2] = all_left_readings[i + 4][1].toFixed(2);
            user_readings[i + 4][3] = all_right_readings[i + 4][0].toFixed(2);
            user_readings[i + 4][4] = all_right_readings[i + 4][1].toFixed(2);
            user_readings[i + 4][5] = ((all_left_readings[i + 4][0] -
                all_left_readings[i + 4][3] +
                (all_left_readings[i + 4][2] -
                    all_left_readings[i + 4][4]) *
                    0.02) /
                10).toFixed(3);
        }
    }
}
function delete_readings() {
    if (num_of_readings >= 0) {
        if (new_row && num_of_readings == 0) {
            user_readings[num_of_readings][1] = '';
            user_readings[num_of_readings][2] = '';
            tab.draw();
            show_table_panel();
            return;
        }
        else if (new_row && num_of_readings > 0) {
            num_of_readings--;
            new_row = false;
            user_readings[num_of_readings][3] = '';
            user_readings[num_of_readings][4] = '';
            user_readings[num_of_readings][5] = ' ';
            tab.draw();
            show_table_panel();
            return;
        }
        else if (!new_row && num_of_readings == 0) {
            user_readings[num_of_readings][3] = '';
            user_readings[num_of_readings][4] = '';
            user_readings[num_of_readings][5] = ' ';
            new_row = false;
            tab.draw();
            show_table_panel();
            return;
        }
        else if (!new_row && num_of_readings > 0) {
            user_readings[num_of_readings][1] = '';
            user_readings[num_of_readings][2] = '';
            new_row = true;
            tab.draw();
            show_table_panel();
            return;
        }
    }
    else {
        alert('No input values');
    }
}
function show_table_panel() {
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight4'));
    bsOffcanvas.show();
}
function show_side_panel() {
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight3'));
    bsOffcanvas.show();
}
function move_to_act4() {
    // user_data = [];
    // user_data = data;
    // for(let i=0; i<4; i++) {
    //     user_data[i][1] = parseFloat(user_readings[i][5]);
    //     user_data[i][3] = parseInt(user_readings[i][1]) -  parseInt(user_readings[i][3]);
    //     user_data[i][4] = parseInt(user_readings[i][2]) -  parseInt(user_readings[i][4]);
    // }
    // fine_up_btn.removeEventListener('click', move_fine_up);
    // fine_down_btn.removeEventListener('click', move_fine_down);
    // reset.removeEventListener('click', re_center);
    activity3();
}
function fill_test_val() {
    for (let i = 0; i < 8; i++) {
        user_readings[i][1] = '00';
        user_readings[i][2] = '00';
        user_readings[i][3] = '00';
        user_readings[i][4] = '00';
        user_readings[i][5] = '00';
    }
    // num_of_readings = 8;
    // add_readings();
    for (let i = 0; i < 8; i++) {
        user_data[i] = [];
        user_data[i][0] = auto_fill_data[i][0];
        user_data[i][1] = auto_fill_data[i][1];
        user_data[i][2] = auto_fill_data[i][2];
        user_data[i][3] = auto_fill_data[i][3];
        user_data[i][4] = auto_fill_data[i][4];
        user_data[i][5] = auto_fill_data[i][5];
        user_data[i][6] = auto_fill_data[i][6];
        user_data[i][7] = auto_fill_data[i][7];
        user_data[i][8] = auto_fill_data[i][8];
        user_data[i][9] = auto_fill_data[i][9];
    }
    fine_up_btn.removeEventListener('click', move_fine_up);
    fine_down_btn.removeEventListener('click', move_fine_down);
    reset.removeEventListener('click', re_center);
    //activity3();
}
// activity2();
//# sourceMappingURL=activity2.js.map