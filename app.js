let v = [];
let box = document.getElementById("box");
let buttons = document.getElementById('buttons');

for(let i = 0; i < 100; i++) {
    v[i] = document.createElement("DIV");
    v[i].classList.add('element');
    v[i].style.height = Math.floor(Math.random() * (screen.height * 0.7)) + 'px';
    v[i].style.width = screen.width / 20 + 'px';
    
    box.appendChild(v[i]);
}

let refresh = document.getElementById('refresh');

refresh.addEventListener('click', () => {
    for(let i = 0; i < 100; i++) {
        v[i].style.height = Math.floor(Math.random() * (screen.height * 0.7)) + 'px';
    }
});

//let speed = prompt("Enter the sorting speed in ms(1000ms == 1s)", "10");
let speed = 10;
let aux, Hi, Hj;

//Selection Sort 
let button1 = document.getElementById("selection");
button1.addEventListener('click',async () => {
    buttons.style.display = 'none';
    for(let i = 0; i < 99; i++) {
        v[i].style.backgroundColor = 'green';
            for(let j = i + 1; j < 100; j++) {
                v[j].style.backgroundColor = 'red';
                await sleep(5);
                        Hi = v[i].style.height.match(/(\d+)/);
                        Hj = v[j].style.height.match(/(\d+)/);
            
                        if( Number(Hi[0]) >= Number(Hj[0]) ) {

                            await sleep(5);

                            aux = v[i].style.height;
                            v[i].style.height = v[j].style.height;
                            v[j].style.height = aux;
                        }

                v[j].style.backgroundColor = 'grey';
            }
            v[i].style.backgroundColor = 'grey';
    }
    buttons.style.display = 'flex';
    
});


//Bubble Sort
let button2 = document.getElementById("bubble");
button2.addEventListener('click',async () => {
    buttons.style.display = 'none';
    let schimbare = 1;
    while(schimbare == 1) {
        schimbare = 0;
        for(let i = 0; i < 99; i++) {
            v[i].style.backgroundColor = 'green';
            v[i + 1].style.backgroundColor = 'red';
            await sleep(5);

                        Hi = v[i].style.height.match(/(\d+)/);
                        Hj = v[i + 1].style.height.match(/(\d+)/);

            if( Number(Hi[0]) > Number(Hj[0]) ) {
                await sleep(5);

                            aux = v[i].style.height;
                            v[i].style.height = v[i + 1].style.height;
                            v[i + 1].style.height = aux;

                schimbare = 1;
            }

            v[i].style.backgroundColor = 'grey';
            v[i + 1].style.backgroundColor = 'grey';
        }
    }
    buttons.style.display = 'flex';
});

//Merge Sort
let w = [];
let button3 = document.getElementById("merge");

 async function MergeSort(st, dr) {
    if( st < dr ) {
        let mid = Math.floor( (st + dr) / 2 );
           // console.log(mid);

       await MergeSort(st, mid);
       await MergeSort(mid + 1, dr);
        
        let i = st, j = mid + 1, k = 0;

        while( i <= mid && j <= dr ) {

            
            Hi = v[i].style.height.match(/(\d+)/);
            Hj = v[j].style.height.match(/(\d+)/);

            if( Number(Hi[0]) <= Number(Hj[0]) )
                w[k++] = v[i++].style.height;
            else w[k++] = v[j++].style.height;

            
        }

        while( i <= mid )
            w[k++] = v[i++].style.height;

        while( j <= dr )
            w[k++] = v[j++].style.height;

            //v[dr].style.backgroundColor = 'red';
        for(i = st, j = 0; i <= dr; i++, j++)
            {
                v[i].style.backgroundColor = 'green';
                await sleep(speed);
                v[i].style.height = w[j];
                v[i].style.backgroundColor = 'grey';
            }
           // v[dr].style.backgroundColor = 'grey';

    }
}


button3.addEventListener('click', () => {
    buttons.style.display = 'none';

    MergeSort(0, 99);

    setTimeout( () => {
        buttons.style.display = 'flex';
    },7500);
});

//Quick Sort
let quick = document.getElementById('quick');

async function QuickSort(st, pivot) {
        if( st < pivot ) {
            let j, i = st - 1;

            v[pivot].style.backgroundColor = 'red';
            if( i >= 0 )
                v[i].style.backgroundColor = 'blue';


            for( j = st; j < pivot; j++) {
                v[j].style.backgroundColor = 'green';
                await sleep(speed);

                Hi = v[j].style.height.match(/(\d+)/);
                Hj = v[pivot].style.height.match(/(\d+)/);

                if( Number(Hi[0]) <= Number(Hj[0]) ) {
                    await sleep(speed);
                    if( i >= 0 )
                        v[i].style.backgroundColor = 'grey';

                            aux = v[++i].style.height;
                            v[i].style.height = v[j].style.height;
                            v[j].style.height = aux;
                    v[i].style.backgroundColor = 'blue';
                }
                v[j].style.backgroundColor = 'grey';
            }

            await sleep(speed);

            if( i >= 0 )
                        v[i].style.backgroundColor = 'grey';

            aux = v[++i].style.height;
            v[i].style.height = v[pivot].style.height;
            v[pivot].style.height = aux;
            v[i].style.backgroundColor = 'blue';

            if( i >= 0 )
                        v[i].style.backgroundColor = 'grey';
            v[pivot].style.backgroundColor = 'grey';

            await QuickSort(st, i - 1);
            await QuickSort(i + 1, pivot);
            buttons.style.display = 'flex';
        }
}

quick.addEventListener('click', () => {
    buttons.style.display = 'none';
    QuickSort(0, 99);

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
