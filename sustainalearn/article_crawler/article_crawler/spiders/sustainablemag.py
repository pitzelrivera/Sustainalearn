import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from article_crawler.items import Article
import json


class SustainablemagSpider(CrawlSpider):
    name = 'sustainablemag'
    allowed_domains = ['sustainabilitymag.com']
    start_urls = ['https://sustainabilitymag.com/sustainability']

    custom_settings={
        'FEED_URI': 'articles.json',
        'FEED_FORMAT': 'json'
    }

    rules = [Rule(LinkExtractor(allow='sustainabilitymag.com/articles/'), callback='parse', follow=True)]

    def parse(self, response):
        article = Article()

        category = response.xpath('//div[@class="Type_m-body2__3AsD- Type_d-body3__24mDH Type_medium__2avgC"]/text()').get()

        if category != 'Sustainability':
            pass

        article['title'] = response.xpath('//div[@class="ArticleHeader_Headline__3UTZW"]/h1/text()').get()
        article['author'] = "By " + response.xpath('//div[@class="ArticleHeader_Details__3n5Er"]/div[@class="Type_m-body2__3AsD- Type_d-body3__24mDH Type_medium__2avgC"]/text()').getall()[1]
        article['content'] = response.xpath('//div[@class="Prose_Prose__2zaJW"]//*[self::p or self::li or self::h2]/text()').getall()
        article['url'] = response.url
        article['date'] = response.xpath('//div[@class="Type_m-body2__3AsD- Type_d-body3__24mDH Type_medium__2avgC"]/text()').get()
       #article['id'] = id + 1


        return article
