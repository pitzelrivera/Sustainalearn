import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from article_crawler.items import Article
import json


class GsticPySpider(CrawlSpider):
    name = 'gstic.py'
    allowed_domains = ['www.gstic.org', 'sdg-action.org']
    start_urls = ['https://www.gstic.org/news/energy/']

    custom_settings={
        'FEED_URI': 'sdg-action_articles.json',
        'FEED_FORMAT': 'json'
    }

    rules = [Rule(LinkExtractor(allow='sdg-action.org/'), callback='parse', follow=True)]

    def parse(self, response):
        article = Article()

        author = response.xpath('//h3[@class="text-sm"]/text()').get()
        content = response.xpath('//div[@class="blocks"]/p/text()').getall()

        if author == None or content == None:
            pass

        article['title'] = response.xpath('//title/text()').get()
        article['author'] = "By " + author
        article['content'] = content
        article['url'] = response.url
        article['date'] = response.xpath('//time[@class="post__date"]/text()').get()


        return article
