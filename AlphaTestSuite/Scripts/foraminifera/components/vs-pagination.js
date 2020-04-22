function Pagination(renderAt, pages, displayLimit) {
  this.pages = pages;
  this.renderAt = renderAt;
  this.activePage = 1;
  this.displayLimit = displayLimit;
  this.getActivePage = function() {
    return this.activePage;
  }
  this.render = function(currentPage) {
    var renderAt = this.renderAt;
    var noOfPages = this.pages;
    var currentPage = typeof currentPage != 'undefined' ? currentPage : this.activePage;
    var displayLimit = typeof this.displayLimit != 'undefined' ? this.displayLimit : 3;

    if (noOfPages <= displayLimit) {
      var linkArray = [];
      var pageNo = 1;
      var prevDisabledClass;
      var nextDisabledClass;
      for (var i = 0; i <= noOfPages + 1; i++) {
        if (i == 0) {
          if (currentPage <= 1) {
            previousButton = 'javascript:void(0);';
            prevDisabledClass = 'disabled';
          } else {
            pageNo = currentPage > 1 ? currentPage - 1 : 1;
            prevDisabledClass = '';
            previousButton = 'paginate.render('+pageNo+');paginate.handler();';
          }

          linkArray.push(`<li class="vs-page-previous ${prevDisabledClass}" onclick="${previousButton}"><a href="javascript:void(0)"   class="pag_item " >Previous</a></li>`);
        } else if (i <= noOfPages) {
          var activeLinkCls = '';
          if (i == currentPage) {
            activeLinkCls = 'current_page';
          }
          pageNo = i;
          linkArray.push(`<li class="vs-page-links ${activeLinkCls}" onclick="paginate.render(${pageNo});paginate.handler();" ><a href="javascript:void(0)"  class="pag_item pag_item_${i} " >${i}</a></li>`);
        } else {
          if (currentPage >= noOfPages) {
            nextDisabledClass = 'disabled';
            NextBtn = `javascript:void(0);`;
          } else {
            pageNo = currentPage < noOfPages ? currentPage + 1 : currentPage;
            nextDisabledClass = '';
            NextBtn = `paginate.render(${pageNo});paginate.handler();`;
          }

          linkArray.push(`<li class="vs-page-next ${nextDisabledClass}" onclick="${NextBtn}"><a href="javascript:void(0)"  class="pag_item page_next ${nextDisabledClass}" >Next</a></li>`);
        }
      }
      var pagination = linkArray.join(" ");
      renderAt.innerHTML = `<nav class="vs-pagination"><ul>${pagination}</ul></nav>`;


    } else {
      var linkArray = [];
      var onNextClick;
      var onPrevClick;
      for (var i = 0; i <= noOfPages + 1; i++) {

        if (i == 0) {

          if (currentPage <= 1) {
            onPrevClick = `javascript:void(0);`;
            prevDisabledClass = 'disabled';
          } else {
            pageNo = currentPage > 1 ? parseInt(currentPage) - 1 : 1;
            onPrevClick = `paginate.render(${pageNo});paginate.handler();`;
            prevDisabledClass = '';
          }
          var prevBtn = `<nav><ul class="vs-page-down" ><li class="vs-page-previous ${prevDisabledClass}" onclick="${onPrevClick}"><a href="javascript:void(0)"   class="pag_item " >Previous</a></li></ul></nav>`;
        } else if (i <= noOfPages) {
          var selectedOption = '';
          if (i == currentPage) {
            selectedOption = 'selected';
          }
          linkArray.push(`<option value=${i}  ${selectedOption} >${i} of ${noOfPages}</option>`);
        } else {
          if (currentPage >= noOfPages) {
            onNextClick = `javascript:void(0);`;
            nextDisabledClass = 'disabled';
          } else {
            pageNo = currentPage < noOfPages ? parseInt(currentPage) + 1 : parseInt(currentPage);
            onNextClick = `paginate.render(${pageNo});paginate.handler();`;
            nextDisabledClass = '';
          }
          var nextBtn = `<nav><ul class="vs-page-up"><li class="vs-page-next ${nextDisabledClass}" onclick="${onNextClick}"><a href="javascript:void(0)"   class="pag_item " >Next</a></li></ul></nav>`;
        }
      }


      var pagination = linkArray.join(" ");
      renderAt.innerHTML = `<div  class="vs-pagination">${prevBtn} <select class="vs-pagintion-drp-down" onchange="paginate.render(this.value);paginate.handler();"  >${pagination}</select> ${nextBtn}</div>`;

    }
    this.activePage = currentPage;

  }
  this.handler = function() {}
}
