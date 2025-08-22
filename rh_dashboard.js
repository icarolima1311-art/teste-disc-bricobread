// ATENÇÃO: ESTE É O CÓDIGO DE CONFIGURAÇÃO CORRETO
const firebaseConfig = {
    apiKey: "AIzaSyCyH4CIG08T4bPDmYd5N-5Q1FSyTCMX_6I",
    authDomain: "teste-disc-bricobread.firebaseapp.com",
    projectId: "teste-disc-bricobread",
    storageBucket: "teste-disc-bricobread.appspot.com",
    messagingSenderId: "827161354543",
    appId: "1:827161354543:web:d92fc84518f507e5f601da"
};

// Inicialize o Firebase e o Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para buscar e exibir os resultados
async function fetchResults() {
    const resultsTbody = document.getElementById('results-tbody');
    
    // Limpa a tabela antes de carregar novos dados
    resultsTbody.innerHTML = '';

    try {
        const querySnapshot = await db.collection("resultadosDISC").get();
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = document.createElement('tr');
            
            // Formatando a data para ficar mais legível
            const formattedDate = new Date(data.data).toLocaleString('pt-BR');
            
            row.innerHTML = `
                <td>${data.nome}</td>
                <td>${data.email}</td>
                <td>${data.dominancia}</td>
                <td>${data.influencia}</td>
                <td>${data.estabilidade}</td>
                <td>${data.conformidade}</td>
                <td>${formattedDate}</td>
            `;
            resultsTbody.appendChild(row);
        });

    } catch (error) {
        console.error("Erro ao buscar resultados: ", error);
        resultsTbody.innerHTML = `<tr><td colspan="7">Erro ao carregar dados. Verifique a conexão com o Firebase.</td></tr>`;
    }
}

// Chama a função para buscar os resultados assim que a página é carregada
document.addEventListener('DOMContentLoaded', fetchResults);
