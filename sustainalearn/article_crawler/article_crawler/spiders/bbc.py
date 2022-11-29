import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from article_crawler.items import Article
import json


class BbcSpider(scrapy.Spider):
    name = 'bbc'
    allowed_domains = ['bbcearth.com']
    start_urls = ['http://bbcearth.com/news/elbow-grease-and-tech-fighting-the-plastic-crisis']

    custom_settings={
        'FEED_URI': 'articles.json',
        'FEED_FORMAT': 'json'
    }

    def parse(self, response):
        article = Article()

        article['title'] = response.xpath('//h1/text()').get()
        article['author'] = "By " + response.xpath('//p[@class="content-hero__author gel--pica"]/span/text()').get()
        article['content'] = response.xpath('//div[@class="rich-text undefined"]/div//*[self::p or self::h2]/text()').getall()
        article['url'] = response.url
        #article['id'] = 1

        return article




