# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import mysql.connector
from article_crawler.items import Article
from datetime import datetime


class ArticleCrawlerPipeline:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host = "us-cdbr-east-06.cleardb.net",
            user = "b7c4e7e04e6289",
            password = "56deb933",
            database = "heroku_a0ab400d245e966"
        )

        # creating cursor
        self.cur = self.conn.cursor()

    def process_item(self, Article, spider):
        #define insert statement
        self.cur.execute("INSERT INTO article (title, author, content, source, doi, enteredAt, publishedAt, view, posts) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)", (
                Article['title'],
                Article['author'],
                '\n\n'.join(Article['content']),
                Article['url'],
                None,
                datetime.now(),
                Article['date'],
                None,
                0,
            )
        )

        #execute insert of data
        self.conn.commit()
    
    def close_spider(self, spider):
        #close cursor and connection to database
        self.cur.close()
        self.conn.close()