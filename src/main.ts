import { HozzaferesAdat } from './interfaces';
import './style.css'

async function adatLetoltes() {
    try {
        const response = await fetch('https://retoolapi.dev/hWwKDM/data')

        if (!response.ok) {
            document.getElementById('errorMessage')!.textContent = 'Hiva a kérés közben';
            return;
        }
        
        console.log(response.status);
        const adatok = await response.json() as HozzaferesAdat[];        
        const adatokElem = document.getElementById('adatok')!;
        
        adatok
        .filter(adat => adat['IP szám'] ? adat["IP szám"].startsWith('1') : false)
        .sort((a, b) => a.id - b.id)
        .forEach(adat => {
            const li = document.createElement('li');
            li.textContent = `[${adat.id}] ${adat["Egyéni azonosító"]} (${adat["IP szám"]}, ${adat["Hozzáférés"]})`;
            adatokElem.appendChild(li);
        })
    } catch(e: any) {
        document.getElementById('errorMessage')!.textContent = 'Hiba: ' + e.message;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        
    }, 3000);
    adatLetoltes()
    
    document.getElementById('ujadat')!.addEventListener('click', async () => {
        const ujAdat = {
            Id: '',
            Ip: '',
            enable: '',
        };
        const res = await fetch ('https://retoolapi.dev/hWwKDM/data', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(ujAdat),
        })
        if (!res.ok) {
            document.getElementById('errorMessage')!.textContent = 'Hiva a feltöltéskor'
        };
    })
});