PGDMP     +        
            z            onlinebooks    14.1    14.1 I    K           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            L           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            M           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            N           1262    19715    onlinebooks    DATABASE     p   CREATE DATABASE onlinebooks WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE onlinebooks;
                postgres    false            ?            1259    19875    authors    TABLE     ?   CREATE TABLE public.authors (
    author_id integer NOT NULL,
    first_name character varying(30),
    last_name character varying(30)
);
    DROP TABLE public.authors;
       public         heap    postgres    false            ?            1259    19920    authors_author_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.authors_author_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.authors_author_id_seq;
       public          postgres    false    222            O           0    0    authors_author_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.authors_author_id_seq OWNED BY public.authors.author_id;
          public          postgres    false    225            ?            1259    19728    book_categories    TABLE     s   CREATE TABLE public.book_categories (
    category_id integer NOT NULL,
    category_name character varying(20)
);
 #   DROP TABLE public.book_categories;
       public         heap    postgres    false            ?            1259    19727    book_categories_category_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.book_categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.book_categories_category_id_seq;
       public          postgres    false    212            P           0    0    book_categories_category_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.book_categories_category_id_seq OWNED BY public.book_categories.category_id;
          public          postgres    false    211            ?            1259    19768    books    TABLE     ?   CREATE TABLE public.books (
    book_id integer NOT NULL,
    title character varying,
    publisher_id integer,
    price real,
    quantity integer,
    description text,
    category_id integer,
    cover character varying(255)
);
    DROP TABLE public.books;
       public         heap    postgres    false            ?            1259    19895    books_authors    TABLE     d   CREATE TABLE public.books_authors (
    author_id integer NOT NULL,
    book_id integer NOT NULL
);
 !   DROP TABLE public.books_authors;
       public         heap    postgres    false            ?            1259    19767    books_book_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.books_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.books_book_id_seq;
       public          postgres    false    216            Q           0    0    books_book_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.books_book_id_seq OWNED BY public.books.book_id;
          public          postgres    false    215            ?            1259    19836    order_details    TABLE     ?   CREATE TABLE public.order_details (
    order_id integer NOT NULL,
    book_id integer NOT NULL,
    quantity integer NOT NULL,
    price real
);
 !   DROP TABLE public.order_details;
       public         heap    postgres    false            ?            1259    19807    orders    TABLE     ?   CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id integer,
    order_date date NOT NULL,
    status character varying(20),
    address jsonb
);
    DROP TABLE public.orders;
       public         heap    postgres    false            ?            1259    19806    orders_order_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.orders_order_id_seq;
       public          postgres    false    218            R           0    0    orders_order_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;
          public          postgres    false    217            ?            1259    19910    product_discounts    TABLE     d   CREATE TABLE public.product_discounts (
    book_id integer NOT NULL,
    discount real NOT NULL
);
 %   DROP TABLE public.product_discounts;
       public         heap    postgres    false            ?            1259    19735 
   publishers    TABLE     p   CREATE TABLE public.publishers (
    publisher_id integer NOT NULL,
    publisher_name character varying(50)
);
    DROP TABLE public.publishers;
       public         heap    postgres    false            ?            1259    19734    publishers_publisher_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.publishers_publisher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.publishers_publisher_id_seq;
       public          postgres    false    214            S           0    0    publishers_publisher_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.publishers_publisher_id_seq OWNED BY public.publishers.publisher_id;
          public          postgres    false    213            ?            1259    19852    reviews    TABLE     ?   CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    book_id integer NOT NULL,
    user_id integer NOT NULL,
    rating smallint,
    comment text
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            ?            1259    19851    reviews_review_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    221            T           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
          public          postgres    false    220            ?            1259    19717    users    TABLE     ?  CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(50) NOT NULL,
    title character varying(3) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    date_of_birth date NOT NULL,
    phone character varying(15) NOT NULL,
    address jsonb,
    password character varying(50),
    is_admin boolean
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    19716    users_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    210            U           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    209            ?           2604    19921    authors author_id    DEFAULT     v   ALTER TABLE ONLY public.authors ALTER COLUMN author_id SET DEFAULT nextval('public.authors_author_id_seq'::regclass);
 @   ALTER TABLE public.authors ALTER COLUMN author_id DROP DEFAULT;
       public          postgres    false    225    222            ?           2604    19731    book_categories category_id    DEFAULT     ?   ALTER TABLE ONLY public.book_categories ALTER COLUMN category_id SET DEFAULT nextval('public.book_categories_category_id_seq'::regclass);
 J   ALTER TABLE public.book_categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    211    212    212            ?           2604    19771    books book_id    DEFAULT     n   ALTER TABLE ONLY public.books ALTER COLUMN book_id SET DEFAULT nextval('public.books_book_id_seq'::regclass);
 <   ALTER TABLE public.books ALTER COLUMN book_id DROP DEFAULT;
       public          postgres    false    215    216    216            ?           2604    19810    orders order_id    DEFAULT     r   ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);
 >   ALTER TABLE public.orders ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    217    218    218            ?           2604    19738    publishers publisher_id    DEFAULT     ?   ALTER TABLE ONLY public.publishers ALTER COLUMN publisher_id SET DEFAULT nextval('public.publishers_publisher_id_seq'::regclass);
 F   ALTER TABLE public.publishers ALTER COLUMN publisher_id DROP DEFAULT;
       public          postgres    false    213    214    214            ?           2604    19855    reviews review_id    DEFAULT     v   ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);
 @   ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    221    220    221            ?           2604    19720    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    210    209    210            E          0    19875    authors 
   TABLE DATA           C   COPY public.authors (author_id, first_name, last_name) FROM stdin;
    public          postgres    false    222   ?U       ;          0    19728    book_categories 
   TABLE DATA           E   COPY public.book_categories (category_id, category_name) FROM stdin;
    public          postgres    false    212   V       ?          0    19768    books 
   TABLE DATA           o   COPY public.books (book_id, title, publisher_id, price, quantity, description, category_id, cover) FROM stdin;
    public          postgres    false    216   5V       F          0    19895    books_authors 
   TABLE DATA           ;   COPY public.books_authors (author_id, book_id) FROM stdin;
    public          postgres    false    223   RV       B          0    19836    order_details 
   TABLE DATA           K   COPY public.order_details (order_id, book_id, quantity, price) FROM stdin;
    public          postgres    false    219   oV       A          0    19807    orders 
   TABLE DATA           P   COPY public.orders (order_id, user_id, order_date, status, address) FROM stdin;
    public          postgres    false    218   ?V       G          0    19910    product_discounts 
   TABLE DATA           >   COPY public.product_discounts (book_id, discount) FROM stdin;
    public          postgres    false    224   ?V       =          0    19735 
   publishers 
   TABLE DATA           B   COPY public.publishers (publisher_id, publisher_name) FROM stdin;
    public          postgres    false    214   ?V       D          0    19852    reviews 
   TABLE DATA           O   COPY public.reviews (review_id, book_id, user_id, rating, comment) FROM stdin;
    public          postgres    false    221   =W       9          0    19717    users 
   TABLE DATA           ?   COPY public.users (user_id, email, title, first_name, last_name, date_of_birth, phone, address, password, is_admin) FROM stdin;
    public          postgres    false    210   ZW       V           0    0    authors_author_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.authors_author_id_seq', 1, false);
          public          postgres    false    225            W           0    0    book_categories_category_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.book_categories_category_id_seq', 1, false);
          public          postgres    false    211            X           0    0    books_book_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.books_book_id_seq', 1, false);
          public          postgres    false    215            Y           0    0    orders_order_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.orders_order_id_seq', 1, false);
          public          postgres    false    217            Z           0    0    publishers_publisher_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.publishers_publisher_id_seq', 24, true);
          public          postgres    false    213            [           0    0    reviews_review_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.reviews_review_id_seq', 1, false);
          public          postgres    false    220            \           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);
          public          postgres    false    209            ?           2606    19879    authors authors_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (author_id);
 >   ALTER TABLE ONLY public.authors DROP CONSTRAINT authors_pkey;
       public            postgres    false    222            ?           2606    19733 $   book_categories book_categories_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.book_categories
    ADD CONSTRAINT book_categories_pkey PRIMARY KEY (category_id);
 N   ALTER TABLE ONLY public.book_categories DROP CONSTRAINT book_categories_pkey;
       public            postgres    false    212            ?           2606    19899     books_authors books_authors_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.books_authors
    ADD CONSTRAINT books_authors_pkey PRIMARY KEY (author_id, book_id);
 J   ALTER TABLE ONLY public.books_authors DROP CONSTRAINT books_authors_pkey;
       public            postgres    false    223    223            ?           2606    19775    books books_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (book_id);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public            postgres    false    216            ?           2606    19840     order_details order_details_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (order_id, book_id);
 J   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_pkey;
       public            postgres    false    219    219            ?           2606    19814    orders orders_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    218            ?           2606    19914 (   product_discounts product_discounts_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.product_discounts
    ADD CONSTRAINT product_discounts_pkey PRIMARY KEY (book_id);
 R   ALTER TABLE ONLY public.product_discounts DROP CONSTRAINT product_discounts_pkey;
       public            postgres    false    224            ?           2606    19740    publishers publishers_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_pkey PRIMARY KEY (publisher_id);
 D   ALTER TABLE ONLY public.publishers DROP CONSTRAINT publishers_pkey;
       public            postgres    false    214            ?           2606    19859    reviews reviews_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    221            ?           2606    19726    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    210            ?           2606    19724    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            ?           2606    19900 *   books_authors books_authors_author_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.books_authors
    ADD CONSTRAINT books_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(author_id);
 T   ALTER TABLE ONLY public.books_authors DROP CONSTRAINT books_authors_author_id_fkey;
       public          postgres    false    222    3230    223            ?           2606    19905 (   books_authors books_authors_book_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.books_authors
    ADD CONSTRAINT books_authors_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(book_id);
 R   ALTER TABLE ONLY public.books_authors DROP CONSTRAINT books_authors_book_id_fkey;
       public          postgres    false    3222    223    216            ?           2606    19781    books books_category_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.book_categories(category_id);
 F   ALTER TABLE ONLY public.books DROP CONSTRAINT books_category_id_fkey;
       public          postgres    false    216    3218    212            ?           2606    19776    books books_publisher_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_publisher_id_fkey FOREIGN KEY (publisher_id) REFERENCES public.publishers(publisher_id);
 G   ALTER TABLE ONLY public.books DROP CONSTRAINT books_publisher_id_fkey;
       public          postgres    false    216    3220    214            ?           2606    19846 (   order_details order_details_book_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(book_id);
 R   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_book_id_fkey;
       public          postgres    false    216    219    3222            ?           2606    19841 )   order_details order_details_order_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);
 S   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_order_id_fkey;
       public          postgres    false    218    219    3224            ?           2606    19815    orders orders_user_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public          postgres    false    210    3216    218            ?           2606    19915 0   product_discounts product_discounts_book_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.product_discounts
    ADD CONSTRAINT product_discounts_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(book_id);
 Z   ALTER TABLE ONLY public.product_discounts DROP CONSTRAINT product_discounts_book_id_fkey;
       public          postgres    false    216    224    3222            ?           2606    19860    reviews reviews_book_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(book_id);
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_book_id_fkey;
       public          postgres    false    3222    221    216            ?           2606    19865    reviews reviews_user_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
       public          postgres    false    210    221    3216            E      x?????? ? ?      ;      x?????? ? ?      ?      x?????? ? ?      F      x?????? ? ?      B      x?????? ? ?      A      x?????? ? ?      G      x?????? ? ?      =   g   x?M?+?@@?=
Ix?/Q??`0? ,%??pzd?7cJ?ey6?{?hX?缢I?;?h?'??q????;'J2?J?T?NP
ZA-?Uz?^?W?Uz?BD~lJXw      D      x?????? ? ?      9   ?   x??ϱN?0?????g?L?j&?@?.??r?F??ؕ}?@?w?	?Nx?e?݇0f???]檍)?ι@?4? ?ڔ
K}????z~??Bn?ᅼ???c?4Ǉ`=M??M.g?"?ʈ???D??9^????jS?"٩?c?6Z7?Z)?8?>?s?RG?rǉ?'???F_?>???1vnc?G?Y??K<!??;?w???ڈM????z?i?ȝ??p?AT?6????????*??Yx?     