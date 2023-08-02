create table users(
	user_id serial not null,
	email_id varchar(50) unique not null,
	password_user varchar(6) not null
)