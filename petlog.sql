create table advertisement
(
    id         int auto_increment
        primary key,
    brand_name varchar(50)                           not null,
    image_url  varchar(255)                          not null,
    content    varchar(30)                           not null,
    sort_order int       default 0                   not null,
    created_at timestamp default current_timestamp() not null
);

create table banner
(
    id              int auto_increment
        primary key,
    image_url       varchar(255)                   not null,
    sub_category_id int                            null,
    sort_order      int                            not null,
    device_type     varchar(10) default 'web'      not null,
    target_type     varchar(20) default 'category' not null,
    brand_name      varchar(50)                    null
);

create table category
(
    id           int auto_increment
        primary key,
    display_text varchar(30) not null
);

create table chat_room
(
    id              int auto_increment
        primary key,
    created_at      datetime default current_timestamp() not null,
    last_message    text                                 null,
    last_message_at datetime                             null,
    last_sender_id  int                                  null
);

create table coupon
(
    id                  int auto_increment
        primary key,
    name                varchar(50)                           not null,
    discount_type       varchar(10)                           not null,
    discount_value      int                                   not null,
    min_order_amount    int       default 0                   not null,
    max_discount_amount int                                   null,
    start_date          datetime                              not null,
    end_date            datetime                              null,
    total_quantity      int                                   null,
    issued_quantity     int       default 0                   not null,
    coupon_limit        int                                   null,
    created_at          timestamp default current_timestamp() not null
);

create table email_verification
(
    verification_id int auto_increment
        primary key,
    type            varchar(20)                            not null,
    email           varchar(255)                           not null,
    code            varchar(6)                             not null,
    is_verified     tinyint(1) default 0                   not null,
    is_used         tinyint(1) default 0                   not null,
    expires_at      datetime                               not null,
    created_at      datetime   default current_timestamp() not null
);

create table hospital
(
    id        bigint auto_increment
        primary key,
    manage_no varchar(50)  null,
    name      varchar(255) null,
    address   varchar(255) null,
    phone     varchar(50)  null,
    status    varchar(50)  null,
    zip_code  varchar(20)  null,
    lat       double       null,
    lng       double       null,
    crd_x     double       null,
    crd_y     double       null,
    constraint manage_no
        unique (manage_no)
);

create table salon
(
    id        int auto_increment
        primary key,
    manage_no varchar(50)  null,
    name      varchar(255) null,
    address   varchar(255) null,
    phone     varchar(50)  null,
    status    varchar(50)  null,
    zip_code  varchar(20)  null,
    lat       double       null,
    lng       double       null,
    crd_x     double       null,
    crd_y     double       null,
    constraint manage_no
        unique (manage_no)
);

create table sub_category
(
    id           int auto_increment
        primary key,
    display_text varchar(30) not null,
    category_id  int         not null,
    constraint `1`
        foreign key (category_id) references category (id)
            on delete cascade
);

create table product
(
    id                int auto_increment
        primary key,
    brand             varchar(50)                           not null,
    name              varchar(200)                          not null,
    price             int                                   not null,
    discount_price    int       default 0                   not null,
    delivery_fee      int       default 0                   not null,
    stock             int       default 0                   not null,
    sub_category_id   int                                   not null,
    event_category_id int                                   null,
    created_at        timestamp default current_timestamp() not null,
    pet_type          varchar(20)                           not null,
    constraint `1`
        foreign key (sub_category_id) references sub_category (id),
    constraint `2`
        foreign key (event_category_id) references sub_category (id)
);

create table `option`
(
    id               int auto_increment
        primary key,
    product_id       int           not null,
    option_name      varchar(50)   not null,
    additional_price int default 0 not null,
    stock            int default 0 not null,
    constraint `1`
        foreign key (product_id) references product (id)
            on delete cascade
);

create index product_id
    on `option` (product_id);

create index event_category_id
    on product (event_category_id);

create index sub_category_id
    on product (sub_category_id);

create table product_detail_image
(
    id         int auto_increment
        primary key,
    product_id int          not null,
    image_url  varchar(255) not null,
    sort_order int          not null,
    constraint `1`
        foreign key (product_id) references product (id)
            on delete cascade
);

create index product_id
    on product_detail_image (product_id);

create table product_image
(
    id           int auto_increment
        primary key,
    product_id   int                  not null,
    image_url    varchar(255)         not null,
    is_thumbnail tinyint(1) default 0 not null,
    sort_order   int                  not null,
    constraint `1`
        foreign key (product_id) references product (id)
            on delete cascade
);

create index product_id
    on product_image (product_id);

create index category_id
    on sub_category (category_id);

create table terms
(
    terms_id    int auto_increment
        primary key,
    title       varchar(50) not null,
    terms_type  varchar(25) not null,
    user_target varchar(10) not null,
    is_required tinyint(1)  not null,
    constraint terms_type
        unique (terms_type, user_target)
);

create table users
(
    id         int auto_increment
        primary key,
    email      varchar(255)                         not null,
    login_id   varchar(50)                          not null,
    password   varchar(100)                         not null,
    phone      varchar(11)                          not null,
    user_type  varchar(10)                          not null,
    created_at datetime default current_timestamp() not null,
    updated_at datetime                             null,
    constraint email
        unique (email),
    constraint login_id
        unique (login_id),
    constraint phone
        unique (phone)
);

create table address
(
    address_id        int auto_increment
        primary key,
    user_id           int                                    not null,
    address_type      varchar(10)                            not null,
    postal_code       varchar(5)                             not null,
    address_primary   varchar(150)                           not null,
    address_secondary varchar(100)                           null,
    lat               double                                 null,
    lng               double                                 null,
    is_default        tinyint(1) default 0                   not null,
    created_at        datetime   default current_timestamp() not null,
    updated_at        datetime                               null,
    constraint `1`
        foreign key (user_id) references users (id)
            on update cascade on delete cascade
);

create index user_id
    on address (user_id);

create table business_user
(
    user_id             int                                  not null
        primary key,
    company_name        varchar(150)                         not null,
    representative_name varchar(20)                          not null,
    business_number     varchar(10)                          not null,
    created_at          datetime default current_timestamp() not null,
    updated_at          datetime                             null,
    constraint business_number
        unique (business_number),
    constraint `1`
        foreign key (user_id) references users (id)
            on update cascade on delete cascade
);

create table cart
(
    id         int auto_increment
        primary key,
    user_id    int                                   not null,
    product_id int                                   not null,
    option_id  int                                   null,
    quantity   int                                   not null,
    created_at timestamp default current_timestamp() not null,
    constraint unique_cart_item
        unique (user_id, product_id, option_id),
    constraint `1`
        foreign key (user_id) references users (id)
            on delete cascade,
    constraint `2`
        foreign key (product_id) references product (id)
            on delete cascade,
    constraint `3`
        foreign key (option_id) references `option` (id)
            on delete set null
);

create index option_id
    on cart (option_id);

create index product_id
    on cart (product_id);

create table chat_message
(
    id         int auto_increment
        primary key,
    room_id    int                                  not null,
    sender_id  int                                  not null,
    message    text                                 not null,
    created_at datetime default current_timestamp() not null,
    constraint `1`
        foreign key (room_id) references chat_room (id)
            on delete cascade,
    constraint `2`
        foreign key (sender_id) references users (id)
            on delete cascade
);

create index idx_chat_message_room
    on chat_message (room_id, id);

create index sender_id
    on chat_message (sender_id);

create table chat_room_member
(
    room_id              int                                  not null,
    user_id              int                                  not null,
    joined_at            datetime default current_timestamp() not null,
    last_read_message_id int                                  null,
    primary key (room_id, user_id),
    constraint `1`
        foreign key (room_id) references chat_room (id)
            on delete cascade,
    constraint `2`
        foreign key (user_id) references users (id)
            on delete cascade
);

create index user_id
    on chat_room_member (user_id);

create table delivery_address
(
    delivery_address_id int auto_increment
        primary key,
    user_id             int                                    not null,
    delivery_name       varchar(10)                            not null,
    receiver_name       varchar(10)                            not null,
    phone               varchar(11)                            not null,
    postal_code         varchar(5)                             not null,
    address_primary     varchar(150)                           not null,
    address_secondary   varchar(100)                           null,
    is_default          tinyint(1) default 0                   not null,
    created_at          datetime   default current_timestamp() not null,
    updated_at          datetime                               null,
    constraint `1`
        foreign key (user_id) references users (id)
            on update cascade on delete cascade
);

create index user_id
    on delivery_address (user_id);

create table feed
(
    id            int auto_increment
        primary key,
    user_id       int                                  not null,
    title         varchar(150)                         not null,
    content       text                                 not null,
    like_count    int      default 0                   not null,
    comment_count int      default 0                   not null,
    created_at    datetime default current_timestamp() not null,
    updated_at    datetime                             null,
    constraint `1`
        foreign key (user_id) references users (id)
            on update cascade on delete cascade
);

create index idx_feed_created_id
    on feed (created_at desc, id desc);

create index idx_feed_like_id
    on feed (like_count desc, id desc);

create index user_id
    on feed (user_id);

create table feed_comment
(
    id                int auto_increment
        primary key,
    feed_id           int                                   not null,
    user_id           int                                   not null,
    parent_comment_id int                                   null,
    content           varchar(500)                          not null,
    created_at        timestamp default current_timestamp() not null,
    updated_at        timestamp                             null,
    constraint `1`
        foreign key (feed_id) references feed (id)
            on update cascade on delete cascade,
    constraint `2`
        foreign key (user_id) references users (id)
            on update cascade on delete cascade,
    constraint `3`
        foreign key (parent_comment_id) references feed_comment (id)
            on update cascade on delete cascade
);

create index idx_comment_feed_parent
    on feed_comment (feed_id, parent_comment_id);

create index parent_comment_id
    on feed_comment (parent_comment_id);

create index user_id
    on feed_comment (user_id);

create table feed_likes
(
    id         int auto_increment
        primary key,
    user_id    int                                   not null,
    feed_id    int                                   not null,
    created_at timestamp default current_timestamp() not null,
    constraint user_id
        unique (user_id, feed_id),
    constraint `1`
        foreign key (user_id) references users (id)
            on update cascade on delete cascade,
    constraint `2`
        foreign key (feed_id) references feed (id)
            on update cascade on delete cascade
);

create index feed_id
    on feed_likes (feed_id);

create index idx_feed_likes_user_created
    on feed_likes (user_id asc, created_at desc);

create table feed_media
(
    id            int auto_increment
        primary key,
    feed_id       int                                        not null,
    media_url     varchar(255)                               not null,
    thumbnail_url varchar(255)                               not null,
    media_type    enum ('IMAGE', 'VIDEO')                    not null,
    sort_order    int default 0                              not null,
    source        enum ('DOG_API', 'CAT_API', 'USER_UPLOAD') not null,
    constraint `1`
        foreign key (feed_id) references feed (id)
            on update cascade on delete cascade
);

create index idx_feed_media_feed_sort
    on feed_media (feed_id, sort_order);

create table follows
(
    id                int auto_increment
        primary key,
    following_user_id int                                  not null,
    followed_user_id  int                                  not null,
    created_at        datetime default current_timestamp() not null,
    constraint following_user_id
        unique (following_user_id, followed_user_id),
    constraint `1`
        foreign key (following_user_id) references users (id)
            on update cascade on delete cascade,
    constraint `2`
        foreign key (followed_user_id) references users (id)
            on update cascade on delete cascade
);

create index idx_follows_followed
    on follows (followed_user_id);

create table heart
(
    id         int auto_increment
        primary key,
    user_id    int                                   not null,
    product_id int                                   not null,
    created_at timestamp default current_timestamp() not null,
    constraint unique_heart
        unique (user_id, product_id),
    constraint `1`
        foreign key (user_id) references users (id)
            on delete cascade,
    constraint `2`
        foreign key (product_id) references product (id)
            on delete cascade
);

create index product_id
    on heart (product_id);

create table inquiry
(
    id          int auto_increment
        primary key,
    user_id     int                                     not null,
    title       varchar(200)                            not null,
    content     text                                    not null,
    status      varchar(20) default 'WAIT'              not null,
    created_at  datetime    default current_timestamp() not null,
    updated_at  datetime                                null,
    answer      text                                    null,
    answered_at datetime                                null,
    constraint `1`
        foreign key (user_id) references users (id)
            on delete cascade
);

create index user_id
    on inquiry (user_id);

create table `order`
(
    id                int auto_increment
        primary key,
    user_id           int                                   not null,
    orderer_name      varchar(50)                           not null,
    orderer_email     varchar(100)                          not null,
    orderer_phone     varchar(20)                           not null,
    receiver_name     varchar(50)                           not null,
    receiver_phone    varchar(20)                           not null,
    address_postal    varchar(10)                           not null,
    address_primary   varchar(100)                          not null,
    address_secondary varchar(100)                          null,
    delivery_request  varchar(100)                          null,
    delivery_fee      int       default 0                   not null,
    final_amount      int                                   not null,
    used_coupon_id    int                                   null,
    coupon_discount   int       default 0                   not null,
    used_point        int       default 0                   not null,
    payment_method    varchar(20)                           not null,
    status            varchar(20)                           not null,
    created_at        timestamp default current_timestamp() not null,
    constraint `1`
        foreign key (user_id) references users (id)
            on delete cascade
);

create index used_coupon_id
    on `order` (used_coupon_id);

create index user_id
    on `order` (user_id);

create table order_item
(
    id         int auto_increment
        primary key,
    order_id   int not null,
    product_id int not null,
    option_id  int null,
    quantity   int not null,
    price      int not null,
    constraint `1`
        foreign key (order_id) references `order` (id)
            on delete cascade,
    constraint `2`
        foreign key (product_id) references product (id),
    constraint `3`
        foreign key (option_id) references `option` (id)
);

create index option_id
    on order_item (option_id);

create index order_id
    on order_item (order_id);

create index product_id
    on order_item (product_id);

create table personal_user
(
    user_id         int                                  not null
        primary key,
    name            varchar(20)                          not null,
    nickname        varchar(20)                          not null,
    following_count int      default 0                   not null,
    follower_count  int      default 0                   not null,
    shop_point      int      default 0                   not null,
    created_at      datetime default current_timestamp() not null,
    updated_at      datetime                             null,
    constraint nickname
        unique (nickname),
    constraint `1`
        foreign key (user_id) references users (id)
            on update cascade on delete cascade
);

create table pets
(
    pet_id       int auto_increment
        primary key,
    user_id      int                                    not null,
    name         varchar(30)                            not null,
    species      varchar(50)                            not null,
    birth_date   date                                   not null,
    introduction varchar(50)                            null,
    gender       varchar(10)                            not null,
    weight       decimal(4, 1)                          not null,
    body_type    varchar(10)                            not null,
    image_url    varchar(255)                           null,
    is_primary   tinyint(1) default 0                   not null,
    created_at   datetime   default current_timestamp() not null,
    updated_at   datetime                               null,
    constraint `1`
        foreign key (user_id) references users (id)
            on update cascade on delete cascade
);

create index user_id
    on pets (user_id);

create table point
(
    id          int auto_increment
        primary key,
    user_id     int                                                       not null,
    type        varchar(10)                                               not null,
    `change`    int                                                       not null,
    order_id    int                                                       null,
    description varchar(50)                                               not null,
    expire_date timestamp default (current_timestamp() + interval 1 year) null,
    created_at  timestamp default current_timestamp()                     not null,
    constraint `1`
        foreign key (user_id) references users (id)
            on delete cascade,
    constraint `2`
        foreign key (order_id) references `order` (id)
            on delete cascade
);

create index order_id
    on point (order_id);

create index user_id
    on point (user_id);

create table reservation
(
    reservation_id   int auto_increment
        primary key,
    user_id          int                                     not null,
    store_id         int                                     null,
    reservation_date date                                    not null,
    reservation_time time                                    not null,
    request_text     varchar(500)                            null,
    payment_method   varchar(20) default 'OFFLINE'           not null,
    canceled         tinyint(1)  default 0                   not null,
    created_at       timestamp   default current_timestamp() null,
    updated_at       timestamp   default current_timestamp() null on update current_timestamp(),
    constraint `1`
        foreign key (user_id) references users (id)
            on delete cascade
);

create index user_id
    on reservation (user_id);

create table review
(
    id            int auto_increment
        primary key,
    user_id       int                                   not null,
    product_id    int                                   not null,
    rating        int                                   not null
        check (`rating` between 1 and 5),
    content       varchar(500)                          null,
    created_at    timestamp default current_timestamp() not null,
    order_item_id int                                   null,
    constraint uq_order_item_review
        unique (order_item_id),
    constraint `1`
        foreign key (user_id) references users (id)
            on delete cascade,
    constraint `2`
        foreign key (product_id) references product (id)
            on delete cascade,
    constraint fk_review_order_item
        foreign key (order_item_id) references order_item (id)
);

create index product_id
    on review (product_id);

create index user_id
    on review (user_id);

create table review_image
(
    id         int auto_increment
        primary key,
    review_id  int          not null,
    image_url  varchar(255) not null,
    sort_order int          not null,
    constraint `1`
        foreign key (review_id) references review (id)
            on delete cascade
);

create index review_id
    on review_image (review_id);

create table store
(
    store_id          int auto_increment
        primary key,
    user_id           int                                  not null,
    lat               double                               null,
    lng               double                               null,
    category          varchar(10)                          not null,
    postal_code       varchar(5)                           not null,
    address_primary   varchar(150)                         not null,
    address_secondary varchar(100)                         null,
    store_name        varchar(100)                         not null,
    store_phone       varchar(20)                          null,
    created_at        datetime default current_timestamp() not null,
    updated_at        datetime                             null,
    constraint `1`
        foreign key (user_id) references users (id)
            on update cascade on delete cascade
);

create index user_id
    on store (user_id);

create table user_coupon
(
    id        int auto_increment
        primary key,
    user_id   int                                   not null,
    coupon_id int                                   not null,
    status    varchar(10)                           not null,
    issued_at timestamp default current_timestamp() not null,
    used_at   timestamp                             null,
    order_id  int                                   null,
    constraint `1`
        foreign key (user_id) references users (id)
            on delete cascade,
    constraint `2`
        foreign key (coupon_id) references coupon (id)
            on delete cascade,
    constraint `3`
        foreign key (order_id) references `order` (id)
            on delete cascade
);

alter table `order`
    add constraint `2`
        foreign key (used_coupon_id) references user_coupon (id)
            on delete cascade;

create index coupon_id
    on user_coupon (coupon_id);

create index order_id
    on user_coupon (order_id);

create index user_id
    on user_coupon (user_id);

create table user_terms_agreement
(
    agreement_id int auto_increment
        primary key,
    user_id      int                                  not null,
    terms_id     int                                  not null,
    agreed       tinyint(1)                           not null,
    agreed_at    datetime default current_timestamp() null,
    constraint user_id
        unique (user_id, terms_id),
    constraint `1`
        foreign key (user_id) references users (id)
            on update cascade on delete cascade,
    constraint `2`
        foreign key (terms_id) references terms (terms_id)
            on update cascade on delete cascade
);

create index terms_id
    on user_terms_agreement (terms_id);


