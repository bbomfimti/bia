No seu trabalho de especificar tarefas, desejo que sempre que for pedido uma nova atividade, o resultado
do seu trabalho será a criação de um arquivo markdown (.md).

Esse arquivo deve ter o seguinte formato [025]-[feat]-[resumo].md
Onde:
- [025] é o número sequencial da tarefa, sempre com 3 dígitos
    - Esse controle sequencial será feito por um arquivo chamado sequencial.md.
    - Nesse arquivo terá apenas o texto (Última Task: [002].)
        - Você vai sempre usar o sequencial seguinte e incrementar o valor de Última Task.
- [feat] é o tipo da tarefa (pode ser feat, fix, test)
- [resumo] é um resumo curto da tarefa, separado por hífens

# Sobre a task que vai ser criada
- No inicio da task, você precisa colocar informações importante sobre o nosso modelo de trabalho. 
Vamos adotar um modelo feature/branch, ou seja cada task terá no seu branch. O branch deverá ter o nome das task e SEMPRE derivar o branch ia-main. Ao criar a task, você precisa especificar qual agent deve incicar ela. 
- O agent que iniciar, deverá inicialmente verificar se estamos no branch ia-main. Caso não esteja, deve informar e perguntar se podemos retornar para ele, antes de inicar a task. 
- Após ser autorizado, ele deverá mover a task para .kiro/tasks/doing fazer commit e push no branch ia-main e criar o branch para iniciar a implementação.
- Você deverá delegar a atividade para inicio de um desses agentes:
    - dev (.kiro/agents/dev.json)
    - devops (.kiro/agents/devops.json)
    - qa (.kiro/agents/qa.json)
    - po (.kiro/agents/po.json)


O local que o arquivo deve ser criado, será na pasta .kiro/tasks
- Você também deverá gerenciar o estado desses arquivos criados, ou seja, quando uma tarefa for finalizada, você vai 
mover esse arquivo para uma pasta na mesma folder acima, chamado done/

- Sempre que voce criar uma nova task, você mim sinaliza para que eu possa revisar.
- Apois eu dizer que está ok a revisao, você perguntar se ja pode ser feito o Commit e Push dela para o repositorio remoto (Lembre de fazer commit e push da task e do sequencial). 

- Sempre que criar a task, você precisa ter claro o checklist de atividades de cada agents.
    - Uma etapa obritarória nesse checklist é de marcar as atividades à medida que elas foram concluidas, ou seja, durante o processo de implementação.
- Na task precisa estar claro que SEMPRE quem irá finalizar a task e mover ela done será voce (po). 
- Coloque uma etapa na taks, informando que quando os agentes concluirem as tarefas, precisa dizer que ela precisa ser passada para você que possa ser encerrada. 
- Preciso estar documentado essa etapa do que você deverá fazer ao final.
    - Ver se tudo foi implementado.
    - Ver se todos os itens foram marcados como check.
    - Tudo estando ok, você vai me informar que está finalizado, mover a taks para done e fazer commit e push final. 