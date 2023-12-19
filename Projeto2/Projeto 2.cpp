#include <stdio.h>
#include <string.h>
#include <stdlib.h>

//Struct de Node na lista

struct Node {
    char *arquivo;
    struct Node *proximo;
};

//Struct de matriz do arquivo Pgm

struct Imagem {
	int *pixel;
	int cor;
	int altura, largura;
};

//Criação de novo Node

struct Node *CriarNode(char *arquivo) {
    struct Node *novo_node = (struct Node*)malloc(sizeof(struct Node));
    novo_node -> arquivo = strdup(arquivo);
    novo_node -> proximo = NULL;

	return novo_node;
}

//Inserção de Node ordenado alfabeticamente

void Inserir(struct Node **referencia, char *arquivo) {
    struct Node *atual;
	struct Node *novo_node = CriarNode(arquivo);

    if (*referencia == NULL || strcmp((*referencia) -> arquivo, arquivo) > 0) {
        novo_node -> proximo = *referencia;
        *referencia = novo_node;
    } 
	else {
        atual = *referencia;
        while (atual -> proximo != NULL && strcmp(atual -> proximo -> arquivo, arquivo) < 0) {
            atual = atual -> proximo;
        }
        novo_node -> proximo = atual -> proximo;
        atual -> proximo = novo_node;
    }
}

//Remoção de Node

void Remover(struct Node **referencia, char *arquivo) {
    struct Node *anterior = NULL;
	struct Node *temporario = *referencia;

    if (temporario != NULL && strcmp(temporario -> arquivo, arquivo) == 0) {
        *referencia = temporario -> proximo;
		free(temporario -> arquivo);
		free(temporario);
        
		return;
    }

    while (temporario != NULL && strcmp(temporario -> arquivo, arquivo) != 0) {
        anterior = temporario;
        temporario = temporario -> proximo;
    }

    if (temporario == NULL) {
        printf("\nErro: %s não existe\n", arquivo);
        
		return;
    }

    anterior -> proximo = temporario -> proximo;
    free(temporario -> arquivo);
    free(temporario);
}

//Verificação de formato de arquivo pgm

bool Pgm(const char *string) {
    int comprimento = strlen(string);
    const char *formato = ".pgm";
    int comprimento_do_formato = strlen(formato);

    if (comprimento < comprimento_do_formato) {
        
		return false;
    }
    else {
	
		return (strcmp(string + comprimento - comprimento_do_formato, formato) == 0);
	}
}

//Impressão da lista

void printList(struct Node *principal) {
    struct Node *atual = principal;
    for (int i=0; atual != NULL; i++) {
        printf("\n%s", atual -> arquivo);
        atual = atual -> proximo;
    }
	printf("\n\n====================\n");
}

//Leitura de arquivo pgm

Imagem LerImagem(FILE *arquivo_imagem) {
	char versao[5];
	fscanf(arquivo_imagem, "%s", versao);
	Imagem imagem_atual;
	fscanf(arquivo_imagem, "%d ", &imagem_atual.largura);
	fscanf(arquivo_imagem, "%d ", &imagem_atual.altura);
	fscanf(arquivo_imagem, "%d ", &imagem_atual.cor);

	imagem_atual.pixel = (int*)malloc(imagem_atual.largura*imagem_atual.altura*sizeof(int));
	if (imagem_atual.pixel == NULL) {
		printf("\nErro: não foi possível alocar memória\n");
	}	

	for(int i = 0; i < imagem_atual.largura; i++) {
		for(int j = 0; j < imagem_atual.altura; j++) {
			fscanf(arquivo_imagem, "%d ", &imagem_atual.pixel[i*imagem_atual.altura + j]);
		}
	}
	
	return imagem_atual;
}

//Liberação de memória

void Liberar_Imagem(Imagem *imagem) {
	if (imagem != NULL) {
		free(imagem -> pixel);
		imagem -> pixel = NULL;
	}
}

//Escrita de novos arquivos para as imagens alteradas

void Escrever_Imagem(char *nome_arquivo, Imagem *imagem, const char adicionar[]) {
    char nome_saida[100];
    snprintf(nome_saida, sizeof(nome_saida), "%s%s", adicionar, nome_arquivo);

    FILE *saida = fopen(nome_saida, "w");
    if (!saida) {
        printf("\nErro: não foi possível abrir o arquivo de saída\n");
        return;
    }

    fprintf(saida, "P2\n%d %d\n%d\n", imagem->largura, imagem->altura, imagem->cor);

    for (int i = 0; i < imagem->largura; i++) {
        for (int j = 0; j < imagem->altura; j++) {
            fprintf(saida, "%d ", imagem->pixel[i * imagem->altura + j]);
        }
        fprintf(saida, "\n");
    }

    fclose(saida);
}

//Limiarização das imagens

void Limiar(Imagem *imagem, int limiar) {
	for(int i = 0; i < imagem -> largura; i++) {
		for(int j = 0; j < imagem -> altura; j++) {
			if (imagem -> pixel[i*imagem -> altura + j] < limiar) {
				imagem -> pixel[i*imagem -> altura + j] = 0;
			}
			else {
				imagem -> pixel[i*imagem -> altura + j] = imagem -> cor;
			}
		}
	}
}

//Inversão das imagens

void Inverter(Imagem *imagem) {
	for(int i = 0; i < imagem -> largura; i++) {
		for(int j = 0; j < imagem -> altura; j++) {
			imagem -> pixel[i*imagem -> altura + j] = imagem -> cor - imagem -> pixel[i*imagem -> altura + j];
		}
	}
}

//Espelhamento vertical da imagem

void EspelhamentoVertical(Imagem *imagem) {
	int temporario = 0;
	for(int i = 0; i < (imagem -> altura)/2; i++) {
		for(int j = 0; j < (imagem -> largura); j++) {
			temporario = imagem -> pixel[i  *imagem -> largura + j];
			imagem -> pixel[i  *imagem -> largura + j] = imagem -> pixel[((imagem -> altura - 1 - i)  *imagem -> largura) + j];
			imagem -> pixel[((imagem -> altura - 1 - i)  *imagem -> largura) + j] = temporario;		
		}
	}
}

//Espelhamento horizontal da imagem

void EspelhamentoHorizontal(Imagem *imagem) {
	int temporario = 0;
	for(int i = 0; i < (imagem -> altura); i++) {
		for(int j = 0; j < (imagem -> largura)/2; j++) {
			temporario = imagem -> pixel[(i  *imagem -> largura) + j];
			imagem -> pixel[(i  *imagem -> largura) + j] = imagem -> pixel[(i  *imagem -> largura) + imagem -> largura - j - 1];
			imagem -> pixel[(i  *imagem -> largura) + imagem -> largura - j - 1] = temporario;	
		}
	}
}

//Abertura das imagens e início de procedimentos

void Inicio(struct Node *princ, int limiar, int escolha) {
	if (princ == NULL) {
        printf("\nErro: lista vazia\n");
        return;
	}

	struct Node *atual = princ;
	while(atual != NULL) {
		FILE *arquivo_imagem = fopen(atual -> arquivo, "r");
		if (!arquivo_imagem) {
			printf("Erro: não foi possível abrir o arquivo\n");
			
			return;
		}

		Imagem imagem = LerImagem(arquivo_imagem);
		
		if(escolha == 1) {
			Limiar(&imagem, limiar);
			Escrever_Imagem(atual -> arquivo, &imagem, "Limiar_");
		}
		
		if(escolha == 2) {
			Inverter(&imagem);
			Escrever_Imagem(atual -> arquivo, &imagem, "Inversa_");
		}
		
		if(escolha == 3) {
			EspelhamentoVertical(&imagem);
			Escrever_Imagem(atual -> arquivo, &imagem, "EspelhamentoVertical_");
		}
		
		if(escolha == 4) {
			EspelhamentoHorizontal(&imagem);
			Escrever_Imagem(atual -> arquivo, &imagem, "EspelhamentoHorizontal_");
		}

		fclose(arquivo_imagem);
		Liberar_Imagem(&imagem);
		atual = atual -> proximo;
	}
}

int main() {
	
    struct Node *princ = NULL;

    bool t1 = false;
	char arquivo1[50];
    printf("\nInsira o nome do arquivo: ");
    while(true) {
        scanf("%49s", arquivo1);	
    	t1 = Pgm(arquivo1);
    	if(t1) {

    		break;
		}
		printf("\nErro: o arquivo não corresponde ao formato pgm\n");
	}
    Inserir(&princ, arquivo1);

	while(true) {
		int opcao = 0;
		printf("\n1 -> Adicionar mais um arquivo\n2 -> Remover arquivo\n3 -> Imprimir a lista\n4 -> Continuar...\n\nInsira a próxima etapa: ");
		while(true) {
			scanf("%d", &opcao);
			if(opcao == 1 || opcao == 2 || opcao == 3 || opcao == 4) {
				break;
			}
			printf("\nErro: valor inválido");
		}

		if(opcao == 1) {
			char arquivo[50];
			bool teste = false;
    	    printf("\nInsira o nome do arquivo: ");
    		while(true) {
        		scanf("%49s", arquivo);	
    			teste = Pgm(arquivo);
    			if(teste) {
    				break;
				}
				printf("\nErro: o arquivo não corresponde ao formato pgm\n");
			}
    		Inserir(&princ, arquivo);
		}

		if(opcao == 2) {
			char remover[50];
			printf("\nInsira o nome do arquivo que será removido: ");
			scanf("%49s", remover);
			Remover(&princ, remover);
		}

		if(opcao == 3) {
			printf("\n====================\n\nLista:\n");
    		printList(princ);
		}

		if(opcao == 4) {
			break;
		}
	}

	int funcao = 0;
	printf("\n1 -> Limiarização\n2 -> Inversão de cores\n3 -> Espelhamento vertical\n4 -> Espelhamento horizontal\n\nInsira a próxima etapa: ");
	while(true) {
		scanf("%d", &funcao);
		if(funcao == 1 || funcao == 2 || funcao == 3 || funcao ==4) {
			break;
		}
		printf("\nErro: valor inválido");
	}
	int limiar = 0;

	if(funcao == 1) {
		printf("\nInsira o valor do limiar C: ");
		scanf("%d", &limiar);
	}

	Inicio(princ, limiar, funcao);

    struct Node *temporario;
    while (princ != NULL) {
        temporario = princ;
        princ = princ -> proximo;
        free(temporario -> arquivo);
        free(temporario);
    }

    
	return 0;
}

