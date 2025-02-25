// export async function read() {
//     const response = await fetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
//         "headers": {
//           "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         },
//         "body": "f=READ&n=LOKTEV_TEST_INFO",
//         "method": "POST",
//         // "mode": "cors",
//         // "credentials": "include"
//     });
//     //   }).then(res => res.json()).then(console.log)

//     const data = await response.json()
//     const result = JSON.parse(data.result);

//     return result;

// }

// // в TestPage 
// // read().then(result => console.log('read', result));

const BASE_URL = 'https://fe.it-academy.by/AjaxStringStorage2.php';
// 'VOLKOVSKIY_GdFD32225'
// 'GdRD32225'


async function doFetch2(formData: FormData) {
    const response = await fetch(BASE_URL, {
        body: formData,
        method: "POST",
    });

    const data = await response.json()
    // const result = JSON.parse(data.result);

    return data.result;
}

export async function read(name: string) {
    const formData = new FormData();
    formData.append('f', 'READ');
    formData.append('n', name);

    return doFetch2(formData);
}

export async function insert(name: string, value: string) {
    const formData = new FormData();
    formData.append('f', 'INSERT');
    formData.append('n', name);
    formData.append('v', value);

    return doFetch2(formData);
}

export async function lockGet(name: string, password: string) {
    const formData = new FormData();
    formData.append('f', 'UPDATE');
    formData.append('n', name);
    formData.append('p', password);

    return doFetch2(formData);
}

export async function update(name: string, password: string, value: string) {
    const formData = new FormData();
    formData.append('f', 'UPDATE');
    formData.append('n', name);
    formData.append('p', password);
    formData.append('v', value);

    return doFetch2(formData);

}