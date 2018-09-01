'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.getQns = getQns;
exports.getQnsByUserId = getQnsByUserId;
exports.getQnByQnId = getQnByQnId;
exports.setQnHistory = setQnHistory;
exports.getQnsBySchemeParams = getQnsBySchemeParams;
exports.getEndUserQnsBySctId = getEndUserQnsBySctId;
exports.getEndUserQnsByQnId = getEndUserQnsByQnId;
exports.getQnsBySearchParams = getQnsBySearchParams;
exports.create = create;
exports.upsert = upsert;
exports.deleteQn = deleteQn;

var _question = require('./question.model');

var _question2 = _interopRequireDefault(_question);

var _user = require('../../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

var _composableMiddleware = require('composable-middleware');

var _composableMiddleware2 = _interopRequireDefault(_composableMiddleware);

var _evaluate = require('../../core/evaluate');

var _evaluate2 = _interopRequireDefault(_evaluate);

var _lookups = require('../lookups/lookups.model');

var _lookups2 = _interopRequireDefault(_lookups);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//core business objects
var util = require('util');
var async = require("async");

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    return res.status(statusCode).send(err);
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function getQns(req, res) {
  return _question2.default.find({ "updatedAt": { "$gt": "2017-08-01T03:41:55.032Z" } }).exec().then(respondWithResult(res)).catch(handleError(res));
}

/**
 * getQnsByUserId
 */
//off line mode send back every thing except histories,cu,mu,cd, sort by md
function getQnsByUserId(req, res) {
  var userId = req.user._id;
  console.log('Authenticated: userId -' + req.user.role);
  var exclude = "-evhi -mthi -anhi";
  /*
  if (req.user.role == "master") {
    exclude = "-evhi -mthi"
  }
  else if (req.user.role == "admin") {
    exclude = "-evhi -mthi"
  }
  */

  return _question2.default.find({ "updatedAt": { "$gt": "2017-08-01T03:41:55.032Z" } }).exec().then(respondWithResult(res)).catch(handleError(res));
  /*
  return Question.find({ cu: userId }, exclude).exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
  */
}

/**
 * getQnsByUserId
 */
function getQnByQnId(req, res) {
  console.log("session id:" + req.session.id);
  var qnId = req.params.id;
  var qnOption = req.params.opt;
  //1  edit Question  -evhi -mthi -anhi another idea bring every thing and populate with latest evda, mtch, ans
  //2  test Question (same as enduser)  -evhi -mthi -anhi
  //3  build History Question (same as enduser + save history + get all last history evda, mtch, ans)
  //4  post question (history manipulation - history precedence)

  if (req.params.opt == undefined) {
    //generatte and provide
    var exclude = "-evhi -mthi -anhi -evda -eqn -drng";
    return _question2.default.find({ _id: qnId }).exec().then(respondWithResult(res)).catch(handleError(res));

    //update the history sequence id and session id
    //
    //do not repeat the same data in the same session
  } else {
    if (req.params.opt == 1) {
      return _question2.default.find({ _id: qnId }).exec().then(respondWithResult(res)).catch(handleError(res));
    }
  }
  // console.log('qustion Id -' + qnId)
  // var excludeOpt1 = "-evhi -mthi -anhi";
  // var excludeOpt2 = "-evhi -mthi -anhi";
  //var excludeOpt1 = "-evhi -mthi -anhi";

  // console.log('qns sctid get dberror...' + req.params.id);
  //var query = Question.find({ _id: qnId });
  /*
  return Question.find({ _id: qnId }, exclude).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
  */
  //test question from editor or generare history from editor


  //refresh question from user
}

/**
 * getQnsByUserId
 */
function setQnHistory(req, res) {
  var qnId = req.params.id;
  var qnOption = req.params.opt;
  //1 get for the enduser -- by deafault
  //2 
  //3

  if (req.params.opt == undefined) {
    //generatte and provide
    return _question2.default.find({ _id: qnId }, exclude).exec().then(respondWithResult(res)).catch(handleError(res));
  } else {
    return _question2.default.find({ _id: qnId }).exec().then(respondWithResult(res)).catch(handleError(res));
  }
  // console.log('qustion Id -' + qnId)
  // var excludeOpt1 = "-evhi -mthi -anhi";
  // var excludeOpt2 = "-evhi -mthi -anhi";
  //var excludeOpt1 = "-evhi -mthi -anhi";

  // console.log('qns sctid get dberror...' + req.params.id);
  //var query = Question.find({ _id: qnId });
  /*
  return Question.find({ _id: qnId }, exclude).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
  */
  //test question from editor or generare history from editor


  //refresh question from user

}
//db.getCollection('lookups').find({},{"lkups.lvl":1, _id:0})
//function getSubcatByGrade(grade) {
//ifin cachse get from cache
//console.log('getSubcatByGrade...' + grade);

//return subCatlist;
//});
//}
//db.getCollection('questions').find({"lvl": {"$all": ["beg", "int"]}}) --and
//db.getCollection('questions').find({"lvl": {"$in": ["beg", "adv"]}}) --or
//db.getCollection('questions').find({"lvl": {"$in": ["beg", "adv"]}, "sct": {"$in" : [1,3,"4",2]}})
function getQnsBySchemeParams(req, res) {
  var filter = {};
  var grade = req.body.grade;

  async.waterfall([function (callback) {
    _lookups2.default.find({}, { "lkups.sct_grd": 1, "_id": 0 }, function (err, lookups) {
      if (err) {
        res.status(500).send(err);
      }
      //res.json(lookups);
      //console.log('..questions.find end...');
      var subCatlist = new Array();
      var sctGrdArr = lookups[0].lkups.sct_grd;
      console.log('sctGrdArr:' + (0, _stringify2.default)(sctGrdArr));

      for (var si = 0; si < sctGrdArr.length; si++) {
        if (sctGrdArr[si].grd == grade) {
          subCatlist.push(parseInt(sctGrdArr[si].sct));
        }
      }
      console.log("filter subCatlist: " + (0, _stringify2.default)(subCatlist));
      //  done(subCatlist);
      callback(null, subCatlist);
    });
  }, function (subCatlist, callback) {
    // arg1 is equals 'a' and arg2 is 'b'
    // Code c
    filter["sct"] = {};
    filter["sct"]["$in"] = subCatlist;
    if (req.body.level == "beg") {
      filter["lvl"] = {};
      filter["lvl"]["$in"] = ["beg", "tal"];
    } else if (req.body.level == "int") {
      filter["lvl"] = "int";
    } else if (req.body.level == "adv") {
      filter["lvl"] = { $in: ["adv", "exp"] };
    } else {
      filter["lvl"] = "int";
    }
    console.log("filter start: " + (0, _stringify2.default)(filter));
    handleEndUserQuestions(filter, req, res);
    callback(null, "ok");
  }], function (err, result) {
    console.log("result:" + result);
    // result is 'd'    
  });
}
/**
 * getQnsBySctId4
 * User Qns by Grade Sub Category
 * Not required to create history
 * 1 equation question, 2 simple question
 */
function getEndUserQnsBySctId(req, res) {
  var qnSctId = req.params.id;
  var filter = {};
  filter["sct"] = qnSctId;
  handleEndUserQuestions(filter, req, res);
}

//refresh question logic
function getEndUserQnsByQnId(req, res) {
  //console.log(util.inspect(req, {showHidden: false, depth: null}));
  // console.log("getEndUserQnsByQnId:" + JSON.stringify(req));
  var qnId = req.query.id;
  var filter = {};
  filter["_id"] = qnId;
  handleEndUserQuestions(filter, req, res);
}

function handleEndUserQuestions(filter, req, res) {
  var qns;
  var query = _question2.default.find(filter);
  query.exec(function (err, qns) {
    if (err) {
      console.log('qns get dberror...' + filter);
      res.send(500, { error: err });
    }
    var qnCntRetVal = 0;

    if (!qns) {
      res.status(200).send({ message: "no questions found" });
    }

    if (req.body.timeSpan) {
      //pick questions randomly under this time span
      //shuffle the questions

      var userTimespan = parseInt(req.body.timeSpan) * 60;
      var totalTimespanQns = 0;
      console.log("userTimespan: " + userTimespan);
      //---------------shuffle array -----------
      for (var i = qns.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = qns[i];
        qns[i] = qns[j];
        qns[j] = temp;
      }
      //-------------------------------------------
      //qns = shuffleArray(qns);
      console.log("initial filtered questions from database : " + qns.length);
      for (var qi = 0; qi < qns.length; qi++) {
        console.log("qn[" + qi + "]: time span" + totalTimespanQns);
        if (totalTimespanQns <= userTimespan) {
          if (req.body.level == "beg") {
            filter["lvl"] = { $in: ["beg", "tal"] };
            if (qns[qi].et["beg"]) {
              totalTimespanQns = totalTimespanQns + parseInt(qns[qi].et["beg"]);
            } else if (qns[qi].et["tal"]) {
              totalTimespanQns = totalTimespanQns + parseInt(qns[qi].et["tal"]);
            }
          } else if (req.body.level == "int") {
            //console.log("time : " + qns[qi].et["int"]);
            totalTimespanQns = totalTimespanQns + parseInt(qns[qi].et["int"]);
          } else if (req.body.level == "adv") {
            if (qns[qi].et["exp"]) {
              totalTimespanQns = totalTimespanQns + parseInt(qns[qi].et["exp"]);
            } else if (qns[qi].et["adv"]) {
              totalTimespanQns = totalTimespanQns + parseInt(qns[qi].et["exp"]);
            }
          }
        } else {
          qnCntRetVal = qi;
          break;
        }
      }
      qns = qns.splice(qnCntRetVal);
      //TODO should need to consider removed questions if there are any erroneous in ecal process.
    }
    console.log("questions set after timer : " + qns.length);
    var skipqns = new Array();
    for (var _qi = 0; _qi < qns.length; _qi++) {
      try {
        evaluateQuestion(qns, _qi);
      } //end try
      catch (err2) {
        console.log('Qn failed at evaluateQuestion processing...' + (0, _stringify2.default)(qns[_qi]));
        console.log('error is...' + err2);
        if (qns[_qi].anhi) {
          getEvalDataFromHistory(qns, _qi);
        } else {
          console.log('Qn skipped due to  NO history...');
          skipqns.push(_qi);
          continue;
        }
      }
    } //end of qns for
    ////////////////////////////////////////////////////////
    // if (skipqns.length > 0) {
    var newqns = new Array();
    for (var _qi2 = 0; _qi2 < qns.length; _qi2++) {
      if (isErronousQuestion(_qi2, skipqns)) continue;
      try {
        replaceQuestionWithEvaluatedData(qns, _qi2);
        //no error clean and add to newqns list
        // cleanEndUserQuestion(qns, qi);
        newqns.push(qns[_qi2]);
      } catch (err3) {
        console.log('Qn failed at replaceQuestionWithEvaluatedData processing...' + (0, _stringify2.default)(qns[_qi2]));
        console.log('error is...' + err3);
      }
    }
    //console.log('qns sctid get result...' + JSON.stringify(newqns));
    res.json(newqns);
    /*
    }
    else {
    for (let qi = 0; qi < qns.length; qi++) {
      replaceQuestionWithEvaluatedData(qns, qi);
      cleanEndUserQuestion(qns, qi)
    }
    console.log('qns sctid get result...' + JSON.stringify(qns));
    res.json(qns);
    }
    */
  }); //end of query.exec
}

function isErronousQuestion(qi, skipqns) {
  // if (skipqns.length == 0) return false;
  for (var qj = 0; qj < skipqns.length; qj++) {
    if (qi == skipqns[qj]) return true;
  }return false;
}

function evaluateQuestion(qns, qi) {
  getEvalDataFromEval(qns, qi);
  getMulitpleChoiceFromEval(qns, qi);
}

function getMulitpleChoiceFromEval(qns, qi) {
  if (qns[qi].typ == 1) {
    if (qns[qi].usecase && qns[qi].usecase == 1) {//user defined choices
      //nothing
    } else {
      var drng = qns[qi].drng ? qns[qi].drng : null;
      var getChoiceObj = new _evaluate2.default.getChoices(qns[qi].ans, drng);
      qns[qi].mtch = getChoiceObj.mtch;
    }
  } else if (qns[qi].typ == 2) {
    var getChoiceObj = new _evaluate2.default.getChoices(qns[qi].ans, {});
    qns[qi].mtch = getChoiceObj.mtch;
  }
}

function getEvalDataFromEval(qns, qi) {
  if (qns[qi].typ != 1) return; //continue only for equation question type 1
  var drng = qns[qi].drng ? qns[qi].drng : null;
  var usecase = qns[qi].usecase ? qns[qi].usecase : null;
  //console.log('qns sctid processing input eqn ...' + JSON.stringify(qn.eqn));
  //console.log('qns sctid processing input drng ...' + JSON.stringify(drng));
  var parseEqnObj = new _evaluate2.default.parseEquation(qns[qi].eqn, drng, usecase);
  //console.log('qns sctid equation output result...' + JSON.stringify(parseEqnObj));
  if (parseEqnObj.evda = null) {
    throw new Error("****evda is null****");
  }
  qns[qi].evda = parseEqnObj.evda;
  qns[qi].ans = parseEqnObj.ans;
}

function getEvalDataFromHistory(qns, qi) {
  //tied to session later to avoid same eval data
  var max = qns[qi].anhi.length;
  var rnd = Math.floor(Math.random() * max);
  qns[qi].ans = qns[qi].anhi[rnd];
  qns[qi].evda = qns[qi].evhi[rnd];
  qns[qi].mtch = qns[qi].mthi[rnd];
}

function writeEvalDataToHistory(qns, qi) {
  //tied to session later to avoid same eval data
  //delete previous history NULLs too
  var max = qns[qi].anhi.length;
  var rnd = Math.floor(Math.random() * max);
  qns[qi].ans = qns[qi].anhi[rnd];
  qns[qi].evda = qns[qi].evhi[rnd];
  qns[qi].mtch = qns[qi].mthi[rnd];
}

function cleanEndUserQuestion(qns, qi) {
  qns[qi].evda = undefined;
  qns[qi].anhi = undefined;
  qns[qi].evhi = undefined;
  qns[qi].mthi = undefined;
  qns[qi].drng = undefined;
  qns[qi].eqn = undefined;
}

function cleanEditorQuestion(qns, qi) {
  qns[qi].anhi = undefined;
  qns[qi].evhi = undefined;
  qns[qi].mthi = undefined;
}

function replaceQuestionWithEvaluatedData(qns, qi) {
  for (var k = 0; k < qns[qi].desc.length; k++) {
    qns[qi].desc[k].p = qns[qi].desc[k].p.replace(/\[(.*?)=(.*?)\]/g, function replacer(match, $1, $2) {
      return (qns[qi].evda[$1.trim()] + "").trim();
    });

    qns[qi].desc[k].p = qns[qi].desc[k].p.replace(/\[(.*?)\]/g, function replacer(match, $1) {
      return (qns[qi].evda[$1.trim()] + "").trim();
    });
  }

  if (qns[qi].steps) {
    for (var _k = 0; _k < qns[qi].steps.length; _k++) {
      //description
      qns[qi].steps[_k].desc = qns[qi].steps[_k].desc.replace(/\[(.*?)=(.*?)\]/g, function replacer(match, $1, $2) {
        return qns[qi].evda[$1.trim()] == undefined ? $1.trim() : (qns[qi].evda[$1.trim()] + "").trim();
      });

      qns[qi].steps[_k].desc = qns[qi].steps[_k].desc.replace(/\[(.*?)\]/g, function replacer(match, $1) {
        return qns[qi].evda[$1.trim()] == undefined ? $1.trim() : (qns[qi].evda[$1.trim()] + "").trim();
      });

      //equation
      qns[qi].steps[_k].eqn = qns[qi].steps[_k].eqn.replace(/(\w+)/g, function replacer(match, $1) {
        return qns[qi].evda[$1.trim()] == undefined ? $1.trim() : (qns[qi].evda[$1.trim()] + "").trim();
      });
    } //end of for
  } //end of if
}

/**
 * getQnsByUserId
 */
function getQnsBySearchParams(req, res) {
  var searchObj = {};
  var exclude = "-evhi -mthi -anhi";
  var fieldName = req.query.field;
  var fieldValue = req.query.value;
  searchObj[fieldName] = fieldValue;
  return _question2.default.find(searchObj, exclude).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Category from the DB
/*
export function destroyQn(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/

// Creates a new Contact in the DB
function create(req, res) {
  console.log('qn post data...' + (0, _stringify2.default)(req.body));
  return _question2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Contact in the DB at the specified ID
function upsert(req, res) {
  console.log('qn upsert...' + req.body._id);
  //  if(req.body._id) {
  //   delete req.body._id;
  // }
  return _question2.default.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

/*
export function postQn(req, res) {
		console.log('qn post...' + req.body._id);
		var qn = new Question(req.body);
		try {
			qn.save(function (err, result) {
				if (err) {
					console.log('qn post error...' + req.body._id);
					res.send(err);
				}
				console.log('qn post success...', result);
				res.json(result);
			});
		}
		catch (e) {
			console.log('qn post exception...' + JSON.stringify(e));
		}
}

//////////////////////////PUT PUT //////////////////////////////////////////////
export function putQn(req, res) {
		console.log('qn update id..' + req.body._id);
		var query = {}, options = { upsert: true, new: true };
		// Find the document
		Question.findOneAndUpdate({ _id: req.body._id }, req.body, options, function (error, result) {
			if (error) {
				res.send(500, { error: error });
			}
			result.anhi = undefined;
			result.evhi = undefined;
			res.json(result);
		});
}
*/
////////////////////////////DELETE//////////////////////////////////////
function deleteQn(req, res) {
  console.log('qn delete......', (0, _stringify2.default)(req.body));
  var qn = new _question2.default(req.body);
  qn.remove({
    _id: req.body._id
  }, function (err, Question) {
    if (err) res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
}

//export function upsertQn(req, res) {

//}
//# sourceMappingURL=question.controller.js.map
