#include <iostream>
#include <cmath>
#include <cstdlib>
#include <locale.h>
#include <conio.h>
using namespace std;

//Observação: as impressões serão feitas do menor coeficiente para o maior.

struct polinomio {
	int *coeficiente;
	int potencia;

	//Alocar memória

	polinomio(int temporario) {
		potencia = temporario;
		coeficiente = (int*)malloc(sizeof(int)*(potencia+1));
	}

	//Liberar memória

	~polinomio() {
		free(coeficiente);
	}

	//Leitura dos coeficientes

	void lercoeficientes(const char *n) {
		int potencia = 0;
		FILE *arquivo = fopen(n, "r");
		if (arquivo) {
			while(!feof(arquivo)) {
				fscanf(arquivo, "%d", &coeficiente[potencia]);
				potencia += 1;
			}
		}
		else {
			cout << "\nErro: o arquivo não pôde ser aberto\n";
		} 
	}

	//Imprimir os coeficientes

	void imprimircoeficientes() {
		for(int i = 0; i <= potencia; i++) {
			cout << coeficiente[i];
			if(potencia != i) {
				cout << ", ";
			}
		}
	}

	//Cálculo de Pn(z)

	float pn(float z) {
		float total = 0;
		for(int i = 0; i <= potencia; i++) {
			total += coeficiente[i] * pow(z, i);
		}
		return total;
	}
		
	//Imprimir coeficientes das operações de soma, subtração e multiplicação
	
	void operar(int potencia1, int potencia2, const char *n1, const char *n2) {
		int coeficiente1[potencia1 + 1], coeficiente2[potencia2 + 1];

		FILE *pol1 = fopen(n1, "r");
		if (pol1) {
			for(int i = 0; i <= potencia1; i++) {
				fscanf(pol1, "%d", &coeficiente1[i]);
			}
		}
		else {
			cout << "\nErro: o arquivo não pôde ser aberto\n";
		} 

		FILE *pol2 = fopen(n2, "r");
		if (pol2) {
			for(int i = 0; i <= potencia2; i++) {
				fscanf(pol2, "%d", &coeficiente2[i]);
			}
		}
		else {
			cout << "\nErro: o arquivo não pôde ser aberto\n";
		} 

	//Operação de soma

	int coeficientesoma[potencia2 + 1], coeficientesubtracao[potencia2 + 1];
		cout << ("\n\n\n\nRespectivamente, os coeficientes do polinômio resultante da operação de soma são: ");
		for(int i = 0; i <= potencia1; i++) {
			coeficientesoma[i] = coeficiente1[i] + coeficiente2[i];
			cout << coeficientesoma[i];
			if(potencia1 != i-1) {
				cout << ", ";
			}
		}
		for(int j = potencia1 + 1; j <= potencia2; j++) {
			cout << coeficiente2[j];
			if(potencia2 != j) {
				cout << ", ";
			}
		}

		//Operação de subtração

		cout << ("\nRespectivamente, os coeficientes do polinômio resultante da operação de subtração são: ");
		for(int i = 0; i <= potencia1; i++) {
			coeficientesubtracao[i] = coeficiente2[i] - coeficiente1[i];
			cout << coeficientesubtracao[i];
			if(potencia1 != i-1) {
				cout << ", ";
			}
		}
		for(int j = potencia1 + 1; j <= potencia2; j++) {
			cout << coeficiente2[j];
			if(potencia2 != j) {
				cout << ", ";
			}
		}	

		//Operação de multiplicação

		cout << "\nRespectivamente, os coeficientes do polinômio resultante da operação de multiplicação são: ";
		int coeficientemultiplicacao[potencia1 + potencia2 + 1];
		for(int i = 0; i < potencia1 + potencia2 + 1; i++) {
			coeficientemultiplicacao[i] = 0;
		}
		for(int j = 0; j <= potencia1; j++) {
			for(int k = 0; k <= potencia2; k++) {
				coeficientemultiplicacao[j+k] += (coeficiente1[j]  *coeficiente2[k]);
			}
		}		
		for(int l = 0; l < potencia1 + potencia2 + 1; l++) {
			cout << coeficientemultiplicacao[l];
			if(l < potencia1 + potencia2) {
				cout << ", ";
			}
		}
	}

	//Operação de derivação

	void imprimirderivada() {
		for(int i = 1; i <= potencia; i++) {
			cout << i*coeficiente[i];
			if(i != potencia) {
				cout << ", ";
			}
		}
	}
	
	float derivar(float z) {
		float der = 0;
		for(int i = 1; i <= potencia; i++) {
			der += i * coeficiente[i] * pow(z, i - 1);
		}
	return der;
	}
	
	//Operação de integração indefinida

	float integralindefinida(int z, int f) {
		float ref = 0;
		float ind = 0;
		for(int i = 0; i <= potencia; i++) {
			ref = static_cast<float>(coeficiente[i])/(i + 1);
			ind += ref * pow(z, i + 1);
			if(f == 0) {
				cout << coeficiente[i]; 
				if(i != potencia) {
					cout << ", ";
				}	
			}
		}
	return ind;		
	}
	
	//Operação de integração definida

	float integraldefinida(int z1, int z2, int potencia1, int potencia2, int k, const char *n1, const char *n2) {
		float def = 0;
		polinomio polinomio1(potencia1);
		polinomio polinomio2(potencia2);
		polinomio1.lercoeficientes(n1);
		polinomio2.lercoeficientes(n2);
		if(k == 1) {
			def = polinomio1.integralindefinida(z2, 1) - polinomio1.integralindefinida(z1, 1);
		}
		else {
			def = polinomio2.integralindefinida(z2, 1) - polinomio2.integralindefinida(z1, 1);
		}
	return def;
	}
	
	//Método de Newton-Raphson

	float newtonraphson(int z0, int tmax, float e) {
    	float raiz = static_cast<float>(z0);
    	float d, p;
    	for (int i = 0; i < tmax; i++) {
        	d = derivar(raiz);
			p = pn(raiz);
        	
        	float raizp = raiz - p / d;
        	if (fabs(raizp - raiz) < e) {
       	    return raizp;
        	}        
        	raiz = raizp;
    	}
   	return raiz;
	}
};

//Leitura das potências

int lerpotencia(const char *n) {
	int potencia = 0;
	int *temporario = 0;
	FILE *arquivo = fopen(n, "r");
	if (arquivo) {
		while (fscanf(arquivo, "%d", &temporario) != EOF) {
			potencia += 1;
		}
	}
	else {
		cout << "\nErro: o arquivo não pôde ser aberto\n";
	} 
	return potencia - 1;
}

int main() {

	setlocale(LC_ALL, "portuguese");

	cout << "\n\n\nDica 1: os coeficientes devem estar individualmente em cada linha do seu arquivo\n";
	cout << "Dica 2: o grau de ambos os polinômios deve ser maior ou igual a zero\n";
	cout << "Dica 3: o grau do segundo polinômio deve ser superior ao grau do primeiro polinômio\n\n\n";
	
	//Questão número 2 do projeto

	int potencia1 = 0;
	int potencia2 = 0;
	char n1[15];
	cout << "\nInsira o nome do arquivo que contém os coeficientes do primeiro polinômio: ";
	cin >> n1;
	char n2[15];
	cout << "Insira o nome do arquivo que contém os coeficientes do segundo polinômio: ";
	cin >> n2;

	potencia1 = lerpotencia(n1);
	potencia2 = lerpotencia(n2);	
	if(potencia1 >= potencia2) {
		cout << "\n\n\nErro: o grau do segundo polinômio é menor ou igual ao grau do primeiro polinômio";
		return EXIT_FAILURE;
	}
	
	polinomio polinomio1(potencia1);
	polinomio polinomio2(potencia2);
	
	polinomio1.lercoeficientes(n1);
	polinomio2.lercoeficientes(n2);
	
	cout << "\n\n\nRespectivamente, os coeficientes do primeiro polinomio são: ";
	polinomio1.imprimircoeficientes();
	cout << "\nRespectivamente, os coeficientes do segundo polinomio são: ";
	polinomio2.imprimircoeficientes();
	
	int z;
	cout << "\n\n\n\nInsira o valor de z, que é a vari?vel usada nos polinômios: ";
	cin >> z;
	
	cout << "\n\n\nO primeiro polinômio resulta em: ";
	int total1 = polinomio1.pn(z);
	cout << total1;
	cout << "\nO segundo polinômio resulta em: ";
	int total2 = polinomio2.pn(z);
	cout << total2;
	
	//Questão número 3 do projeto

	polinomio1.operar(potencia1, potencia2, n1, n2);

	cout << "\n\n\n\nA soma dos polinômios resulta em: " << total1 + total2;
	cout << "\nA subtração dos polinômios resulta em: " << total2 - total1;
	cout << "\nA multiplicação dos polinômios resulta em: " << total1 * total2;
	
	//Questão número 4 do projeto

	cout << "\n\n\n\nRespectivamente, os coeficientes da derivada do primeiro polinômio são: ";
	polinomio1.imprimirderivada();
	cout << "\nRespectivamente, os coeficientes da derivada do segundo polinômio são: ";
	polinomio2.imprimirderivada();
	
	int der1 = polinomio1.derivar(z);
	int der2 = polinomio2.derivar(z);
	cout << "\n\n\n\nA derivada do primeiro polinômio resulta em: " << der1;	
	cout << "\nA derivada do segundo polinômio resulta em: "<< der2;	

	int c;
	cout << "\n\n\n\nInsira o valor de c, a constante de integração: ";
	cin >> c;
	cout << "\n\n\nRespectivamente, os coeficientes da integral indefinida do primeiro polinômio são: ";
	polinomio1.integralindefinida(z, 0);
	cout << "\nRespectivamente, os coeficientes da integral indefinida do segundo polinômio são: ";
	polinomio2.integralindefinida(z, 0);

	cout << "\n\n\n\nA integral indefinida do primeiro polinômio resulta em: " << polinomio1.integralindefinida(z, 1) + c;
	cout << "\nA integral indefinida do segundo polinomio resulta em: " << polinomio2.integralindefinida(z, 1) + c;
	
	int z1, z2;
	z1 = z2 = 0;
	while(z1 >= z2) {
		cout << "\n\n\n\nInsira o ínicio do intervalo da integral definida: ";
		cin >> z1;
		cout << "Insira o final do intervalo da integral definida, sendo que o valor final deve ser maior que o inicial: ";
		cin >> z2;
	}
	
	cout << "\n\n\nA integral definida do primeiro polinômio resulta aproximadamente em: " << polinomio1.integraldefinida(z1, z2, potencia1, potencia2, 1, n1, n2);
	cout << "\nA integral definida do segundo polinômio resulta aproximadamente em: " << polinomio2.integraldefinida(z1, z2, potencia1, potencia2, 2, n1, n2);

	//Questão número 5 do projeto

	cout << "\n\n\n\nInsira o valor de z0: ";
	int z0 = 0;
	cin >> z0;
	cout << "Insira o valor de tmax: ";
	int tmax = 0;
	cin >> tmax;
	cout << "Insira o valor de e: ";
	float e = 0;
	cin >> e;
	
	cout << "\n\nA raiz do primeiro polinômio resulta aproximadamente em: " << polinomio1.newtonraphson(z0, tmax, e);
	cout << "\nA raiz do segundo polinômio resulta aproximadamente em: " << polinomio2.newtonraphson(z0, tmax, e) << "\n\n\n";
	
	cout << "Aperte ENTER para continuar\n\n\n";
	getch();

return 0;
}

