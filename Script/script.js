let index = -1; //var index pra cada questão do Form;

let indexSeg = 0; //Var de segundos pro Timer configurável;

let adSeg = document.getElementById("maisT"); //Var pra adicionar tempo pelo click;
let retSeg = document.getElementById("menosT"); //Var pra remover tempo pelo click;

let shake = document.getElementById("sec"); //Var que permite manipular o texto de segundos totais;

let questions = document.querySelectorAll(".question"); // Var que recebe e permite manipular as questões do HTML;
let nextBtn = document.getElementById("nextQ"); //Var que recebe e permite manipular o botão de próx Pergunta;
let options = document.querySelectorAll("input[type='radio']"); //Var que recebe e permite manipular cada alternativa do quiz;

//Função pra adicionar tempo ao clicar no +.
function addtempo(){
    if (indexSeg<30){
        indexSeg+=5; //+5 segundos por click no botão "+"
        document.getElementById("sec").innerText = `Segundos totais: ${indexSeg}s`; // enquanto for menor que 20, ele pode adicionar 5 segundos.
    } else {
        alert("Tempo máximo alcançado!"); // caso tente ser maior que 25, alerta chegar ao limite.
        shake.classList.add("shakeMaior");
        setTimeout(() => {
            shake.classList.remove("shakeMaior");
        }, 300); // caso tente ser maior que 20, treme em cor verde.
    }
};
//Função pra retirar tempo ao clicar no -.
function deltempo(){
    if (indexSeg > 0){
        indexSeg-=5; // -5 segundos por Click no "-".
        document.getElementById("sec").innerText = `Segundos totais: ${indexSeg}s` //Enquanto for maior que 0 segundos, pode adicionar 5 segundos.
    } else {
        alert("Tempo não pode ser menor que 0!");
        shake.classList.add("shakeMenor"); //Caso chegue a 0, alerta limite mínimo 5.
        setTimeout(() => {
            shake.classList.remove("shakeMenor");
        }, 300)  // Caso tente ser menor que 0, treme em cor vermelha.
    }
};

//Função pra adicionar tempo;
adSeg.addEventListener("click", addtempo);

//Função pra tirar tempo
retSeg.addEventListener("click", deltempo);

//Começa o Quiz quando o User clica no botão de "Começar".
let comeca = document.querySelector(".StartButton");
let alertou = false;
let comecouQuiz = false;
const bg = [
    "url('imagens/img1.jpg')",
    "url('imagens/img2.jpg')",
    "url('imagens/img3.jpg')",
    "url('imagens/img4.jpg')",
    "url('imagens/img5.jpg')",
    "url('imagens/img6.jpg')",
    "url('imagens/img7.jpg')",
    "url('imagens/img8.jpg')",
    "url('imagens/img9.jpg')",
    "url('imagens/img10.jpg')",
]
comeca.addEventListener("click", () => {
    if (indexSeg > 0){
        index++;
        questions[index].classList.add("question-on"); // Adiciona classe de inicialização do quiz na primeira pergunta.
        comeca.style.display = "none"; // Retira o botão de começar o quiz, evitando bugs.

        comecouQuiz = true;

        TimerStart()

        let aumentar = document.getElementById("maisT");
        aumentar.style.display = 'none'; //Retira o botão de adicionar tempo;

        let diminuir = document.getElementById("menosT");
        diminuir.style.display = 'none'; //Retira o botão de tirar tempo;

        document.getElementById("textoConfig").remove()

        document.getElementById("sec").innerText = `Segundos Restantes: ${indexSeg}s` // Muda o texto das configurações de segundos.
    } else {
        if (!alertou){
            alert("Não pode começar com tempo em 0!");
            alertou = true;
        } //Se alertar uma vez, depois não alerta mais.

        shake.classList.add("shakeMenor"); //Caso chegue a 0, alerta limite mínimo 5.

        setTimeout(() => {
            shake.classList.remove("shakeMenor");
        }, 300) //Treme o texto em vermelho caso tente diminuir abaixo de 0.
    }
}); // Só permite que o usuário aperte o botão de começar uma vez;}

let timer;
//função do sistema do temporizador;
function TimerStart(){
    var tempo = indexSeg //variável que indica o tempo
    
    //Se o botão de Começar quiz for clicado dá inicio ao quiz.

    if (comecouQuiz){

        document.getElementById("sec").innerText = `Segundos Restantes: ${tempo}s`; //Altera o texto incialmente pra os segundos escolhidos.

        timer = setInterval(() => { //Criação do temporizador;
            tempo--; //Redução do tempo por segundo.
            document.getElementById("sec").innerText = `Segundos Restantes: ${tempo}s`; //Alteração do texto do tempo por segundo.

            if(tempo < 0){ //Se o tempo chegar em 0 e o usuário não responder, passa a pergunta.
                clearInterval(timer);
                TrocaClasse()
                TimerStart();
            };
        }, 1000); // 1000ms - 1 segundo antes de repetir o bloco dentro do setInteval.
    };
};
// Quando seleciona  alternativa o botão de próxima pergunta aparece. 

//Se o botão for apertado, reinicia o tempo;
nextBtn.addEventListener("click", () => {
    clearInterval(timer);
    TimerStart();
});

//Botão próx pergunta só aparece se eu selecionar uma alternativa
options.forEach(item => {
        item.addEventListener("change", () => {
        nextBtn.style.display = "block";
        })
});

// Muda de pergunta.
function TrocaClasse(){
    if (index < 8){
        nextBtn.style.display = "none"; // Esconde o botão de próxima pergunta enquanto a pergunta altera.

        questions[index].classList.remove("question-on"); // remove a classe do da pergunta do índice

        index++; // passa pro próximo índice

        questions[index].classList.add("question-on"); // adiciona classe da pergunta ativa no índice atual

        //Trocar o fundo do site
        document.body.style.backgroundImage = bg[index];
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "Center"
    } else if (index === 8){
        nextBtn.style.display = "none"; // Esconde o botão de próxima pergunta enquanto a pergunta altera.
    
        document.getElementById("nextQ").style.display = "none";

        questions[index].classList.remove("question-on"); // remove a classe do da pergunta do índice

        index++; //Passa pro próximo índice

        document.getElementById("nextQ").innerText = "Finalizar Questionário"; //Muda o texto do botão pra "Finalizar Questionário";

        questions[index].classList.add("question-on"); // adiciona classe da pergunta ativa no índice atual

        //Trocar o fundo do site
        document.body.style.backgroundImage = bg[index];
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "Center"
    } else if(index === 9){
        nextBtn.style.display = "none"; // Esconde o botão de próxima pergunta enquanto a pergunta altera.

        questions[index].classList.remove("question-on"); // remove a classe do da pergunta do índice

        index++; // passa pro próximo índice

        questions[index].classList.add("question-on"); // adiciona classe da pergunta ativa no índice atual

        let caixaSeg = document.querySelector(".timer");
        caixaSeg.style.display = "none"; //Apaga o timer da tela;
        
        document.querySelector(".gabarito").classList.add("question-on");

        //Trocar o fundo do site
        document.body.style.backgroundImage = bg[index];
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "Center"
    }
};

//Executa Função TrocaClasse quando clica no botão
nextBtn.addEventListener("click", TrocaClasse);
//Deixa o botão Invisível
nextBtn.style.display = "none";

const respostasCorretas = ["C", "C", "B", "A", "B", "D", "B", "B", "A", "C"]; //Lista com as respostas certas

//Detecta opção apertada e envia pra lista, comparando quant. de acertos e editando textos.
document.getElementById("nextQ").addEventListener("click", () => {
    let respostasUsuario = []; //Lista que recebe os inputs do usuário

    //passa em cada alternativa
    for (let i = 1; i <= 10; i++){ 
        let opSelecionada = document.querySelector(`input[name="q${i}"]:checked`); //detecta qual das alternativas foi escolhida;
        if (opSelecionada) {
            respostasUsuario.push(opSelecionada.value); //manda a resposta pro dicionario do usuário;
        } else {
            respostasUsuario.push(null); //Se não tiver correto, manda um valor vazio.
        };
    };

    let pontos = 0; //Variável de pontuação
    for (let i = 0; i < respostasCorretas.length; i++){
        if (respostasUsuario[i] === respostasCorretas[i]){ 
            pontos++; //Compara as respostas e ser forem iguais, adiciona +1 a ponto.
            document.getElementById(`suaResp${i+1}`).style.color = "rgb(99, 212, 99)"; // Se forem iguais, deixa o texto correto verde.
        } else {
            document.getElementById(`suaResp${i+1}`).style.color = "#490505";  //Respostas erradas possuem cor vermelha.
        };
    };

    for (let i = 0; i < respostasUsuario.length; i++){
        document.getElementById(`suaResp${i+1}`).innerText = `Sua Resposta: ${respostasUsuario[i]})` //Resgata as respostas do usuário e altera o texto delas.
    }
    document.getElementById("Pontuacao").innerText = `Pontuação: ${pontos}`; //Altera o texto do resultado final pra a pontuação total.
});

