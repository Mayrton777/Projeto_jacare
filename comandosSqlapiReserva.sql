SELECT * FROM projeto_api.cadastro;

insert into cadastro (nome, email, observacoes) values (
'Inerante Carvalha da Silva', 'inerante@testeemail.com', 'Só consigo até mais tarde'
);

insert into produtos_inteiros (nome, descricao, precoprod, qtdeproduto) values (
"Milho Verde", "Pacote 400 gramas da Flora", 7.89, 60
);



INSERT INTO `jacare_dolago`.`reserva` (`nomesolicitante`, `email`, `datareserva`, `numeropessoas`, `observacoes`) VALUES ('Epitalio Rolando Borges', 'epitalio@gmail.com', '2024-05-10 12:05', '2', 'Agora declarando');


SELECT idreserva, nomesolicitante, email, datareserva, status 
FROM jacare_dolago.reserva 
WHERE email = 'mayrtonredes@gmail.com';

