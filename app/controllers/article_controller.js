// 文章相关接口的controller
const {
  successModel,
  errorModel,
  successModelList
} = require('../models/resModel');
const { exec } = require('../../db/db');
const querystring = require('querystring');

// 添加文章
const addArticle = async (ctx, next) => {
  try {
    const { body } = ctx.request, {title,content,createTime,category} = body;
    let sql = `insert into article (title,content,create_time,category,views) values('${title}','${content}','${createTime}','${category}',1)`
    const result = await exec(sql);
    console.log(result);
    ctx.body = new successModel('操作成功')
  } catch (e) {
    console.log(e);
    ctx.body = new errorModel('服务内部错误');
  }
};

// 添加文章
const updateArticle = async (ctx, next) => {
  try {
    const { body } = ctx.request, {title,content,createTime,category,id} = body;
    let sql = `update article set title='${title}',content='${content}',create_time='${createTime}',category='${category}' where id='${id}'`
    const result = await exec(sql);
    console.log(result);
    ctx.body = new successModel('操作成功')
  } catch (e) {
    console.log(e);
    ctx.body = new errorModel('服务内部错误');
  }
};

// 获取文章列表
const getArticle = async (ctx, next) => {
  try {
    const { query } = ctx.request, { pageNo, pageSize,desc } = query;
    let lengthSql = `select count(id) from article`;
    let sql = `select * from article where 1=1 order by `;
    if (desc) {
      sql+=`${desc} desc `
    } else {
      sql+=`id desc `
    }
    sql+=`limit ${(pageNo-1)*pageSize},${pageSize}`
    // if(body.articleId){
    //   sql += `and articleId='${body.articleId} `
    // }
    const result = await exec(sql);
    const lengthResult = await exec(lengthSql);
    ctx.body = new successModelList(result, { total: lengthResult[0]['count(id)'] });
  } catch (e) {
    console.log(e);
    ctx.body = new errorModel('服务内部错误');
  }

};

// 获取文章详情
const getArticleDetail = async (ctx, next) => {
  try {
    const { query } = ctx.request;
    let sql = `select * from article where 1=1 `;
    if (query.articleId) {
      sql += `and id=${query.articleId} `
    }
    const result = await exec(sql);
    ctx.body = new successModel(result[0])
  } catch (e) {
    ctx.body = new errorModel('服务内部错误')
  }
};

// 删除文章
const deleteArticle = async (ctx, next) => {
  try {
    const { body } = ctx.request, { articleId } = body;
    let sql = `delete from article where id=${articleId}`;
    await exec(sql);
    ctx.body = new successModel('操作成功');
  } catch (e) {
    console.log(e);
    ctx.body = new errorModel('服务内部错误')
  }

};

module.exports = {
  addArticle,
  getArticle,
  deleteArticle,
  updateArticle,
  getArticleDetail
}


