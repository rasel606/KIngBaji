const SortBar = () => (
    <div className="sort-bar ng-star-inserted">
      <div className="sort-bar__title">
        <span>Slots</span>
      </div>
      <div className="sort-bar__box">
        <div className="sort-bar__btn">
          <span className="ng-star-inserted">Filter</span>
          <span className="arrow" style={{ maskImage: 'url("")' }} />
        </div>
        <ul className="sort-bar__select">
          <li className="sort-bar__select__item ng-star-inserted" id="sort_recommend">
            <span id="sort_recommend">Recommend</span>
          </li>
          <li className="sort-bar__select__item ng-star-inserted" id="sort_latest">
            <span id="sort_latest">Latest</span>
          </li>
          <li className="sort-bar__select__item ng-star-inserted" id="sort_favorite">
            <span id="sort_favorite">Favorite</span>
          </li>
          <li className="sort-bar__select__item ng-star-inserted" id="sort_aZ">
            <span id="sort_aZ">A-Z</span>
          </li>
        </ul>
      </div>
    </div>
  );

  export default SortBar