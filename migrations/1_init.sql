create table users (
    id serial primary key,
    email text not null,
    password_hash text not null,
    created_at timestamp not null default now(),
    constraint unique_email unique (email)
);

insert into
    users (
        email,
        password_hash,
        created_at
    )
values (
        'test@email.com',
        '$2b$12$8haLiGVrOGt7SUYjBA2Keeo2A0r0JBf0WxrTgMtLOvVzuD29F/ptK',
        '2023-10-01 12:00:00'
    );

create table funds (
    id serial primary key,
    ticker text not null,
    name text not null,
    region text not null,
    family_name text not null,
    category text not null
);

create table timespan (
    id serial primary key,
    fund_id integer not null,
    price numeric not null,
    data_date timestamp not null
);

create table positions (
    id serial primary key,
    user_id integer not null,
    fund_id integer not null,
    quantity numeric not null,
    buy_date timestamp not null,
    sell_date timestamp
);