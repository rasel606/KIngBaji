const SearchTab = ({ providers, onProviderChange, selectedProvider }) => (
    <div className="tab search-tab ng-star-inserted">
      <ul className="item-ani">
      {providers.map((provider) => (
        <li
          key={provider.id}
          className={`condition-groups ${active === provider.id ? "active" : ""}`}
          onClick={() => handleSelect(provider.id)}
        >
          {provider.id === "all" ? (
            <>
              <div className="icon-all" style={{ backgroundImage: `url(${provider.icon})` }} />
              <p>{provider.name}</p>
            </>
          ) : (
            <label htmlFor={provider.id}>{provider.name}</label>
          )}
        </li>
      ))}
      </ul>
      <div className="btn search-btn ng-star-inserted">
        <span 
          className="item-icon ng-star-inserted" 
          style={{ maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-search-type02.svg?v=1745315543147")' }} 
        />
      </div>
    </div>
  );

  export default SearchTab