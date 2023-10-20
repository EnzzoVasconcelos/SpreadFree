create database IF NOT EXISTS spreadfree;
use spreadfree;

DROP TABLE IF EXISTS `usuario`;
create table usuario(
	id_usuario int primary key auto_increment not null,
    id_tipo_usuario int NOT NULL DEFAULT '2',
	user_name varchar(30) not null,
    email varchar(100) not null,
    senha varchar(60) not null,
    telefone char(18) not null, 
    cidade varchar(45) not null,
    bairro varchar(45) not null,
    data_de_nasc date not null,
    nome varchar(100) not null, 
    foto_perfil varchar (150) not null,
    tipo_perfil varchar (150) not null,
    foreign key (id_tipo_usuario) references tipo_usuario(id_tipo_usuario)
);

DROP TABLE IF EXISTS `tipo_usuario`;
create table tipo_usuario(
	id_tipo_usuario int NOT NULL AUTO_INCREMENT primary key,
    tipo varchar(45) NOT NULL DEFAULT '1', 
    descricao_usuario varchar(100) not null
);

insert into tipo_usuario( tipo, descricao_usuario )
values ('ADM', 'Usuário com acesso a consultas e edições na área administrativa' );


insert into tipo_usuario(tipo, descricao_usuario )
values ('Comum', 'Usario cadastrado' );


insert into tipo_usuario(tipo, descricao_usuario )
values ('PlanoS', 'Usario com plano semanal' );


insert into tipo_usuario(tipo, descricao_usuario )
values ( 'PlanoM', 'Usario com plano mensal' );


insert into tipo_usuario(tipo, descricao_usuario )
values ('PlanoA', 'Usario com plano anual' );


insert into tipo_usuario(tipo, descricao_usuario )
values ('Confeiteiro(a)', 'Quem é Confeiteiro(a)' );


insert into tipo_usuario(tipo, descricao_usuario )
values ( 'Empregada(o)', 'Quem é  Empregada(o)' );


insert into tipo_usuario(tipo , descricao_usuario )
values ('Pedreiro(a)', 'Quem é  Pedreiro(a)' );


insert into tipo_usuario(tipo , descricao_usuario )
values ('Professor(a) Particular', 'Quem é  Professor(a) Particular' );

insert into tipo_usuario(tipo, descricao_usuario )
values ('Programador(a)', 'Quem é  Programador(a)' );

insert into tipo_usuario(tipo, descricao_usuario )
values ('Editor(a) de video', 'Quem é  Editor(a) de video' );

SELECT * FROM spreadfree.tipo_usuario;

DROP TABLE IF EXISTS `post`;
create table post(
	id_post int primary key auto_increment not null,
	id_usuario int not null,
	user_name varchar(30) not null,
    avaliacao int not null,
    comentarios varchar(100) not null,
    legenda varchar(100) not null,
    foto_post varchar(150) not null,
    foreign key (id_usuario) references usuario(id_usuario)
);

DROP TABLE IF EXISTS `comunidade`;
create table comunidade(
	user_name int primary key auto_increment not null,
    id_post int not null,
    id_usuario int not null, 
    legenda varchar(100) not null,
    comentarios varchar(100) not null,
    foto_post varchar(150) not null, 
    avaliacao int not null,
	foreign key (id_usuario) references usuario(id_usuario),
    foreign key (id_post) references post(id_post)
);


DROP TABLE IF EXISTS `planos`;
create table planos(
	id_plano int primary key auto_increment not null,
    plano varchar(45) not null,
    id_destaque int not null,
    foreign key (id_destaque) references destaque(id_destaque)
);

DROP TABLE IF EXISTS `destaque`;
create table destaque (
	id_destaque int primary key auto_increment not null,
    tipo_destaque varchar(45) not null,
    id_plano int not null, 
    id_usuario int not null,
    foreign key (id_usuario) references usuario(id_usuario)
);


DROP TABLE IF EXISTS `pesquisa`;
create table pesquisa(
	id_pesquisa int primary key auto_increment not null,
    user_name int not null,
    foreign key (user_name) references comunidade(user_name)
);

select* from usuario;

insert into usuario(user_name, email, senha, telefone, cidade, bairro, data_de_nasc, nome, foto_perfil, tipo_perfil) 
values ('fernanda_02', 'spreadfree@gmail.com', 'Teste@123', '(11)93220-9457', 'barueri', 'paulista', '2000-04-10', 'fernanda', 'foto_perfil', '@Fernanda');

insert into usuario(user_name, email, senha, telefone, cidade, bairro, data_de_nasc, nome, foto_perfil) 
values ('julia_05', 'juliapeçanha@gmail.com', '101525', '(11)96550-0978', 'barueri', 'paulista', '2000-01-20', 'julia', 'foto_perfil');

insert into usuario(user_name, email, senha, telefone, cidade, bairro, data_de_nasc, nome, foto_perfil) 
values ('Ana_02', 'analuisa@gmail.com', '101530', '(11)96550-5090', 'barueri', 'paulista', '2000-07-28', 'ana', 'foto_perfil');

insert into usuario(user_name, email, senha, telefone, cidade, bairro, data_de_nasc, nome, foto_perfil) 
values ('enzzo_05', 'enzzovasconcelos@gmail.com', '101535', '(11)96550-4090', 'barueri', 'paulista', '2000-03-11', 'enzzo', 'foto_perfil');

insert into usuario(user_name, email, senha, telefone, cidade, bairro, data_de_nasc, nome, foto_perfil) 
values ('eduardo_02', 'eduardomatos@gmail.com', '101540', '(11)96550-0978', 'barueri', 'paulista', '2000-09-20', 'eduardo', 'foto_perfil');