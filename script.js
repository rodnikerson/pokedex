const pokemonList = document.getElementById('pokemon-list')
const firstGenPokemons = 151;
const searchPokemon = document.getElementById('pokemon-search');
const changeImgButton = document.getElementById('btn-image-changer');
const lightDarkModeBtn = document.getElementById('imgPokeballDarkMode');
let zeroToOne = 0;
let selectedPokemonId;

var pokedex = {};

window.onload = async function() {

    for(let i = 1; i <= firstGenPokemons; i++) {
        await pokemonData(i)
        let pokemonRow = document.createElement('p');
        pokemonRow.id = i;
        pokemonRow.classList.add('pokemon-name-container');
        pokemonList.append(pokemonRow)
        pokemonRow.innerText = i.toString() + ' - ' + pokedex[i]['name'].toUpperCase();
        document.getElementById(i).addEventListener('click', dataChanger);
    }
}

async function pokemonData(pokemonId) {

    let url = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonId.toString());
    let resp = await url.json();

    let pokemonName = resp['name'];
    let pokemonTypes = resp['types'];
    let pokemonFrontImg = resp['sprites']['front_default'];
    let pokemonBackImg = resp['sprites']['back_default'];
    let pokemonHp = resp['stats'][0]['base_stat'];
    let pokemonAttack = resp['stats'][1]['base_stat'];
    let pokemonDefense = resp['stats'][2]['base_stat'];
    let pokemonSpAttack = resp['stats'][3]['base_stat'];
    let pokemonSpDefense = resp['stats'][4]['base_stat'];
    let pokemonSpeed = resp['stats'][5]['base_stat'];

    pokedex[pokemonId] = {
        'name': pokemonName,
        'types': pokemonTypes,
        'frontImg': pokemonFrontImg,
        'backImg': pokemonBackImg,
        'hp': pokemonHp,
        'att': pokemonAttack,
        'def': pokemonDefense,
        'spAtt': pokemonSpAttack,
        'spDef': pokemonSpDefense,
        'speed': pokemonSpeed
    }
}

function dataChanger() {
    
    selectedPokemonId = this.id;
    document.getElementById('pokemon-photo').src = pokedex[this.id]['frontImg'];
    const pokedexSelectedTypes = pokedex[this.id]['types'];
    const typeList = document.getElementById('type-list');

    while(typeList.firstChild) {
        typeList.firstChild.remove();
    }

    for(let i = 0; i < pokedexSelectedTypes.length; i++) {
        let spanType = document.createElement('span');
        spanType.classList.add('type');
        spanType.classList.add(pokedexSelectedTypes[i]['type']['name']);
        document.getElementById('type-list').append(spanType);
        spanType.innerText = pokedexSelectedTypes[i]['type']['name'].toUpperCase();
    }

    const spanHp = document.getElementById('hpId');
    const spanAttack = document.getElementById('attackId');
    const spanDefense = document.getElementById('defenseId');
    const spanSpAttack = document.getElementById('spAttackId');
    const spanSpDefense = document.getElementById('spDefenseId');
    const spanSpeed = document.getElementById('speedId');

    spanHp.innerText = pokedex[this.id]['hp'];
    spanAttack.innerText = pokedex[this.id]['att'];
    spanDefense.innerText = pokedex[this.id]['def'];
    spanSpAttack.innerText = pokedex[this.id]['spAtt'];
    spanSpDefense.innerText = pokedex[this.id]['spDef'];
    spanSpeed.innerText = pokedex[this.id]['speed'];

}

searchPokemon.addEventListener('keyup', (e) => {
    let searchThis = e.target.value.toLowerCase();
    const paragraph = document.getElementsByTagName('p');
    for(let i = 0; i < firstGenPokemons; i++) {
        if(paragraph[i].innerText.toLowerCase().includes(searchThis)) {
            paragraph[i].style.display = 'flex';
        }
        else {
            paragraph[i].style.display = 'none';
        }
    }
})

function imgChanger() {
    console.log(selectedPokemonId)
    let imgSide = document.getElementById('pokemon-photo').src
    if(imgSide.includes('back')){
        document.getElementById('pokemon-photo').src = pokedex[selectedPokemonId]['frontImg'];
    }
    else {
        document.getElementById('pokemon-photo').src = pokedex[selectedPokemonId]['backImg'];
    }
    
}

function scenaryChange() {
    let mainContainer = document.getElementById('mainCont');
    let statsContainer = document.getElementById('statsCont');
    let myLogo = document.getElementById('myLogo');
    if(zeroToOne === 0) {
        document.body.style.transition = '0.25s ease-in-out';
        document.body.style.background = 'linear-gradient(to left, #16222A, #3A6073)';
        mainContainer.style.background = 'url(./pokemon-background-dark.jpg)';
        mainContainer.style.border = '5px solid darkblue';
        changeImgButton.style.color = 'white';
        statsContainer.style.color = 'white';
        myLogo.style.filter = 'drop-shadow(1px 1px 1px #FFE259)';
        zeroToOne = 1;
    }
    else {
        document.body.style.transition = '0.25s ease-in-out';
        document.body.style.background = 'linear-gradient(to right, #ffe259, #ffa751)';
        mainContainer.style.background = 'url(./pokemon-background.jpg)';
        mainContainer.style.border = '5px solid #588218'
        changeImgButton.style.color = 'darkblue';
        statsContainer.style.color = 'darkblue';
        myLogo.style.filter = 'drop-shadow(1px 1px 1px darkblue)';
        zeroToOne = 0;
    }
}

lightDarkModeBtn.addEventListener('click', scenaryChange)
changeImgButton.addEventListener('click', imgChanger);

pokemonData();