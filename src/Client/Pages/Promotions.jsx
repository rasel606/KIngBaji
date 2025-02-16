import React, { useState } from "react";
import { Link } from "react-router-dom";
import MashImage from "../../assets/icon-refresh-type01.svg";
import DepositModel from "./DepositModel";
import MyProfilemodal from "./MyProfilemodal";

export default ({
  
  children,
  isMyProfileModal,
  closeOpenMyProfileModal
}) => {
  if (!isMyProfileModal) return null;

  return (
    <div className="modal-overlay" onClick={ProfileModalcloseModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="member-menu active">
            <div className="close" onClick={ProfileModalcloseModal}></div>
            <div
              className="member-header bonuswallet"
              style={{
                backgroundImage:
                  "url(	https://img.c88rx.com/cx/h5/assets/images/member-header-bg.png?v=1736240945415)",
              }}
            >
              <div className="member-header-content">
                <div
                  className="pic"
                  style={{
                    backgroundImage:
                      "url(	https://img.c88rx.com/cx/h5/assets/images/player/vip/memberpic-lv1.svg?v=1736240945415)",
                  }}
                >
                  <div className="infor">
                    <div className="infor"></div>
                    <div className="vip-points active">
                      গিফট পয়েন্ট
                      <span>0</span>
                      <Link className="myvip-text">
                        আমার গিফট পয়েন্ট
                        {/* <img
                          style={{ background: "#000", position: "relative" }}
                          src="https://cxwelcome.com/assets/images/icon-set/player/vip/icon-arrow.svg"
                          alt=""
                        /> */}
                        <span className="item-icon">
                          <img
                            style={{ background: "#ffffff" }}
                            src="https://cxwelcome.com/assets/images/icon-set/player/vip/icon-arrow.svg"
                            alt=""
                          />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="member-menu-content">
              <div className="member-menu-box balance-box">
                <div className="balance balance-row">
                  <div className="text">
                    মেইন ওয়ালেট
                    <div
                      className="icon refresh"
                      style={{
                        backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQEAAACUCAMAAACk7myLAAAAflBMVEX////v7+8jIyPu7u7w8PD+/v709PT7+/vx8fHt7e39/f36+vr5+fn39/f19fX8/Pzz8/P4+Pjy8vIAAAAXFxcbGxsSEhJ2dnbi4uLc3NzT09OFhYXHx8e+vr5RUVE+Pj5fX1+np6eenp5FRUUvLy+NjY02Nja1tbVsbGyWlpbQPqxYAAAgAElEQVR4nO1diXbjOK4VS/u+ebfjOIkTJ///g48AuEASZSup6pmamadzug+LoSjomqSASwD0PLhiXwjh51AMO1n2mxDKBVSLGJtgscJiA8WkhmIemOqwwSbUXypLaQHFLIGuI+yvxBb4mEzY/iosZ9gflPwS+4ugdYItCuyPBMEWJB/eGGB/NTxGlFY+nwTBYmHk8zu8Mcf3pf68P4CA/29DwP9/BP4SBO7PguA/B4FUIZD6fqoQkA/2FQKy1k8jI7GvEYBqQgDk8QmBGlvjg73EtwhAtULA9/Xg8Sqo9jPVnxREIQCCcARqQsA38uETk5gQgD5IPoQuVS9mBBkggE9UCMRwlRFcBRRzLJc5lFsoVliMsUVlW1eFaRGVeGNrW+S2v7ga9Re1tkXJnk4tKtuitP0VtgX1R0JRi9a2KG2LKB4/kb0Y78/z7W8b4ehGZOLEjm6ElAZV7dvRiLOlQkhbHI2ENA476q+Ecke/bWJHN41dz45GHBQerSh2tiQ0Vjo7ulEQQaMTW7d27HX0c8JY8Wms+Hb2VfbFaLawseLjtJI1YRh6VSCvTiEAZYWAkEU1un1ZpNGTdVBLEhfQQiMARZK4xP4IAWytEIAmiUIA+iMEEttfCS263DyG96cRgGJh+6PHxNifmi3QQiEArRP2YgpR7IQjUI4bKgSC7yKgVrjSipYn30YgmSCAN34LgUCPATcCYowA1NhZoF9EzgLolkmsEBAG41ZW61ngY7VBQM+CQAwQEA4EhBzZFgG9xtsbST5fYS4MApF9DCBgZgF0bREYvJieBbIovBQuVQPFAO+PAyirjx82oTGARbUOQJHW5BaKJA/119BvhtUkmoByyR5DCGBrtQ5YQUq8keat7xQkx+rW9pegIDG2yMaC0BOpP/aYiPqjtbaBC9fJvDJFuTKXUaOWdGpBa3dTlg19C4rIVOcltqZvAbZWLWRj1V8JtWplrqA19ddCdaW+Ftia+sPWuhMpVksfJda6dAkiPxHQOrbV6lsAXeON1DXJpz+JMAKVPtAwjQhGjGCKiPqJYPqQPoDfDN9Me60R0TeDBkUHAzOy3wytEclq9dvix0FpRNA104h8pQ/AeFVjL7AaEQjic41IjT18G3qxwGpEcrbc0YhgTdAIiFkE9ArnRCBkCMRDBIIZBBw6IUdAWJ1wHgGHTlhB174LgeA+An4pV8MpAvKrGzoRCN0IQCdTBLJwioD62NDS79CKhwjgCiw7F0sRQEEmCKAgbgSkxITAaBbQ/aRgWIn9KQKVQmA8BoQbARF0jfrOd0kwYxf4IwS8IQJiOAu0lk2zINRjIOWzYIpAJq8wTzopRQ7lrErkVdVQXUB10oZQHWA1FMMSqrsYb2ygusQWsjpJupD6k1eQY3UErSPsr4XqrshAihq+N7t0t5P/wapeoyxFB03wiTUK0qj+mrIoUbwQW1B/JAiIHcYoSIStKxAkwMYxtA4K1V+nb0T5EpLP66C+rOWVVZ28ohzKRQNlrIY75ZVhNZQSbBHDm3VlDOUWqpsCqzuorrB1if3F1F9i+qvlQ/e31+P283I5w3W5XLbH19tBeBk2zkrbX96hIJ63OxxSfGV6IsrX4hNRvoieiKKifBneWE36a0bydTioUqYnqxXO2v1eY+2C3Fq9YWJnSwvVQmtEUE2jGwc92ZCgiJDO5B1eP5+vv36tVpuVujay9OvX9fnyddA3BsouqEHDCrzD5eN6/djucmXRFcLaBTRblD5g7RYmCFki2oY03zSyM/hX7rFlhAjQg4n5aHD20vy2CAhmGSkEYD1s4jA7ffZ9v1r/cl3rlfzb5ZSHbWDsghqUv/gLb1n316eSqscIiCSzCOQWgYllFI8to38ZAnINCXanY99vnC9vLwnC9rQL5CJgEIhfevXHzfOh/OMIcOsYylorhrJWRqGJR0+AIj24gxZ6FgDzQQgg96BngemvbpPD67nv7768BeHt9ZC0tZoF3c4Omf5IOm8hrCDApJhZANWM0tGzAARRWjFjUlBWj5iFHC7FfECxrWw1EQ5YJGahta1Las06GfVXYX9efnr/6FeL3h+uVf/8fpJ3ySc2VfZix836Y1+bh3NBSGwu3+TFsLqoRtVoFIZhjMZmDsUMjWH5/ZYX2qABVmur11jRXQ21uTJezY2JZ/srsNgkUXw4PvfuuX8Hg+NB9t7FoXdk0PUHK58y51G+Go11xnMIerHECELyNfhiOb5YjE08Gt2MJ+Qa0YgpNRqR/WYwjYgzpUwjSsr0/WNm7bt3rVcf72kJGtGWI/DEtWJ4oEMnZDwh1wmXcsVcK2YIcK14hIDmioUTgey02Xz//RGDza8n6OGdI/DaPEZAmKV7qBX/PgIPxoATgXS7bPlzX/1W/pa3Da/o/jkE+CyINBOjNQn1cbmLgJ0Ftf48Fk9vvwOAfOO3J+/AEFi9JSMEOAPKZgFHgGlODAH103olXC39H6/S1lTjavVHW8sqdOvSVofp169H3/9H1+b6uhv8u+HPHEnSTqqn8o3fhusD/LcNbDXTipk+QGx5ZPUBZkOSxhF6+89vfgFc13qz5f/sdzQ/mT7A2XK7UzPQis1ODR8rSh8QTIfjbDmtcPJjwdlyrRPKas4Va50wHLLlh9+cAQaDAQInMz9JkAFXrHRCJDQYW65mSzjiiq1WrLXEKQKeN0UgnbDlgx0T84TD8+/OANfVv3AEPM+JgOdGAFqgAnPfLhh/5Sa2Ia2hyja0doFhywXR7E/X5TrgdxDYWgTYd57ZhnzPSBOHYnbPSHioHVVIJyC7hLwB6XqK+YigWiD3oJREbB1BrWI+cPAUxKQAlSIRePpYOAK+uVKsnj3kbuCRikkBQTpiPgTpelCGISAi/WJga+oXk9X6xcDyrok3kFdX1HUhVetOFiviSTrkmutYKtFQJMKhJho7r/MibxtojcwHcuFdQ/2VDwFYb8BM/nW9Xn+BUbxcaepjECTWggDzgYJY+ZDv76REBdHiXWHlA7GlIaNeDC6P1lAYujB/woHNBxqR3mROrbEI3wzcPQ9p91zTc36gd8+90/01QL79x2X7/vryBNfL69f28twvtJz6Xad3aqQgxBOGyuaz3LMyZgu2e87Y8oLvnisEaPcKDAjuQYGUdoHmBvOg0Gx5GA58SErLlKb3RsC678+vT6f9zo9ozcqjJN0fTmA9LxgJ/an0R1wxWEYurjgkrXbEFcurnGHL29CFgD+HQKgREBO2/Dz/GVz316+9HG4JEMRka8rFPOkauczuv66PB0L/UozZ8j+EgEgfIuAvHAPzpsC6f76Rc43qDxHAMjEft4dmdH8MfcaWEwIju2CIQDpBoE0ZAkhB53IBD4ICijXZ37C0ZgVUJ21Ga7z+ZmQlMND0RSg6U12X2DoLva+5KbD6db55OdDsGTIIARHgJVnr2F/u3c7ru+NgdQ6ToKyNIF1Bb0C0AfUH8mGxxW+GejForV8MiQVs4qWpb/dSOUtmuWLOkhmNKEysPw/jCb20efqY+RVX55cadBLwDxITVgsW3bTLai9+Od9bRtfP3lAfaCxLxv2NBiyZbGz2jhkr6NaI7jKlvlHFZpjSLNpf3PKv1scdfmy4Fw3T4Yj5kL+V5+2P94bBNZ1lSklj+/dyxZ6YmQP99UY/DvU3g0CFvFWd3q53TIrDX82We4e1cw70532ZMD/BGQQi4u1qb3fnc3L759jywTpgrWO7DuSMLU9GbDnNyuzilLz/3HVqqSZ2O2D9KQSUZ6L/9fl5/Lo9nee+Cav3sXX8iC2nJ1q2PB2w5YxOYNRCOanGYjGhJNphE+/JDcA73Trumv5R2GKefUkNGRTmecVgvfWKSSdMkGoi9t0XQzCU/41iyax/UAFFoxVbNx/f+hsl1s2nkit85TR01u9EYJTQifEpNf1VUK18So+PKYXVJRVKH/BNf3XiW/8l3/gbgf+S0YqhVvuUWn8ohcAf4Yp90b64XmBzTNuMJIbWU79i60XzdH2sF6/P+6b8N3HFMwgYprRL3xwv0H+mnf7NHiBQbReY1OvnU1X9qxAQ30MgfnEAsLruSu5bHugdUQcC+/MS+/B6K//8GID5PvAtx2qYLg7fcnD389Xnh/mWNyK9OF6gP8k/NGPf8hCm/sCvD1ocXGNoOghey8YKQmt8hp8m47BolFhrHXuDdYBZx7iZhopIqJy5cb+N6LQ4jsOsshuMpH2XcVyHGe2c4u4hetVGpXMW9y+ebK2czdH0IsamjuMsJI/1okbjThZOixDYvHsFeemCfDUJkhlBQD5pnZAzPJmCaAaAV2GoXN3xfSviiAYakXU+DcjVwsUVow058qrF0Zg5FvL+s0MbMrFetaQRZaD7jLxqo8OiWdAf41xpRFo+wZnS2MUVA5MSjr1qjU74PbYcfM4cbHlSO2bx+npCFzjuW650wgkCwDAel5CLm23BEfgGWx4qrniOLS8DEbi0YqRPLAIuz2rUS29T8Tfvcn6H3nQMuD2ry8PzgkGwOSqvu6lnNbP7fTdbDo+ZIsA8i1zWsZMtz8ZseddNJ8Hq7VRmtr8pAtwugOridM8k0teLgy1nCEzZcuZJFUw8qcjpDIgSj7zLkDfIyZvOQ2YBioKYFNuCfO8qYioCaLx/m/x+q/eywcbKO4+YFHSyo2pwbRNIYGTUItx9ok7cb2ZdDlbn1EP/PeJGqD8SJE+MfKHAx9TmxRok0ekNKvsGHS7xXo50GNJNGe0do48GsmRBjG2EMKxWiRsINK0SXe05TIL1x0F+XYGijTJoovUBeAyMUc6SCWwBDovp/vD0cvw8/+rVNWTS1/2tEA35kDCWDKNxGs07SqHwxbQ+gD4kwJI1+JhcqWbMh2SZZ/WIJ/QGGlH71a9Hv9sG9ne0Z7VGgHlWw40MAY+8alU0iOyx25+eXt63l+ePK7z6Gj0P1zfvH/Ospq3PH3tW727Hy/Mv/ottTp71rHYjQL/ZAAFYL/A384NOmW7Z7vB0e/06fn5+vu+l+Ms8q50I3PGsnvUtLx4hoNnyMk9PL8fLh7Zs1x/efQTEfQSgqFbMpJI2L8nKuOw/6VsOvSojchxxqf0Chn4GvlCzgGnF0lJtIm93uh3P6DnZv0M9fDNSR8QlPHEacYl+gvqbwSIu4XJHXGoEhhGXWisWw4hLl1ZsuQJgFopClisJeAFXa6sLrG5tNTAbWDatsS5q8zoOdqfXi1zCDrV1RqHHVIPWleI1bG3BG5uHFOT/wdmYgXyFlo9XA6FDtSS2blxqqVXrkT6AQWmoxeI+gPotSCdU34xBrFmFK1yL0Wxq91z+ylLjaJv0tA1gaLL45BK/AoNoOyHUN8hG24UDmy8wyqSKkKSdFfITREEapRHBTgiKqvwHlMamHQxZrFnA1P3gB0xp6mZKrf+A1jGJA9C+5cIVczrlinG2oM7ErGgdbQdNrN0+8C3/a7jiWc9qi8A9rrizXNK3EPhn2fKJVvwQAX+KQLAMgcYiEEwR8L+NQLMAgYlvubaO533LdYQFsOWEgPUtp/6YC5fP2PeSPUYhMGTLeZS+0uP9kSD0UzDfco+x5flPfMtp9SSfbCwThUBLMBEYeClXbdOCWrestQqLt63H/Wkfb/tEVd3o1srdmx6jfMaxdWMEIVd3qsYbKyZIZVtwsVvbXzl5X49+W9/8FnLQWx8S9tn0LXbYIrD6gOEJYSRgi2EGBvPbttavL2O/LY0VnYFhoA+YWDOodugDIAjTB2iQoReMSx+Ql0MfUAiIb3DFLAvHnGe1jUfyWB6SYbSd6W8QcTlaLzQC4oe5aJhOuDgPyf8qAj7zrOazQNj4Aj4LLAKDWaARqFPBZwHLxMJngXDPAosAnwUWASvfZBZoSse38QWybGcBQ8DOAvQoKyASkpiFusTQRYrqg5DHiAgRFegIFzhjdFFMTApGXKoARNlaESIYn9nKyjqTLbqGfD5a6ISiBCHmUVYbn5SEohihRde1xucjaaAPrG6amEVcxlBdWfnw6Uy+plOUjhKE5OsaxaRgdUHedPh0dM/LyE+QIiQ7ijyt44zcBzsMhiwS9cKxak0Rl/gKXRtDa4xrJ0kgCJU8E7M8Up6JGCEJraHrjKL08d1rejNs3VLcvYmQTMoslq0pZl7FeGI1NCb5SuiaBIE3i+uws/LRE6G/jIL3S3wbrE74Gs/c9bk+ENlplePoVjsrqFoMYs1A2Wbzm+egsNM05PqAXX88HP9KJ7SCkPnB9oJMJhYkNDy1FyTYGs80IqX6MH0g/q5vOT4hWORZLZZmYuE6IeOKeeamH2diGXlWBzOe1bO+5WPlUbPlQji4YhwD7mw83C6YycYztA01AuKxZcSy8RgEzGPGXLGTLRcOrdhnWjGLsJjTiq0v2ZKIS7a/yHxINFs+0oort1asvnKo6Si7AMqaLfcHPiS+w5fM9seZlHHEZcGVVhOYqHVjVCzV9h9U51ZpZfGPA+2ZVev+rLaLjVurtOZKex4LwrVno+0a7XkkiMo1hdUR056pPysIqyYwKIGZXuGYPgA6hGPvWBiDHFkt7nCtZ4vVijuuEfl27xgas7FHNh9qRFOtmLRsNbqtfPhEvnc8YcmGntXivmc1zkeXZ3W83KsW0vvgNoJvdcI7eUiMRmR1wkTlIUGu2KwXaVZUQTqbhcP4FbMcFD42nvoVh8QlTXTCn3hWuxAIaI2n3FCP8pAgW+4NtWKFQDhAoPj4fD3oSIDAfoP+uG95+UPfcgcCwnysliAwHQNDBE79arP5dcQYK+ITS/PV/BECjjEQJCa+AO0KQiAXiey4nc6CRCEQagYUEQBVmBCAEJdEIdDgHi4hAI0DjUASOMdAon8K0nSg9nODu2V9f3nZJ35ZNYEeA1I+igynTCxq6Qf5UpQan6g8HSOopu02R8QlrLqKQuYhiYVmzyuKpCxNdalaM2IbKY443e93OwkKAJRBfI6mskfOfeqJY58/w8CjJNBpWQizC7Xp+7fj0z5tYytI6RK7HcjXTsRmrX+SgYEWc+5bbvSB8LZ9ez5jAM3t6XQ67Hd0o1d13cDmW8qSyUlZvnK/hFXff2xfD/AlUT6lzLc8Z9+MBSyZb7TiP8YV5++bfrVe0f73+vp2vnxu378AjMMurQi57FtcMdiQY/+s9aZ/HcUT/zWe1V+DDfS1xGKz6Tfr68fz21micfy6JbQ9vxiBomsd/lmbU/SvRGCSjWcWgf2cK9h6DWis5P9/3bx7OyZTBJp06mW5Oe+aIQJzOyZL2HJCAF0JNALk+yXU1m6oGqLjP3aLeoNHuSrQIYEso3Y+vIZd/TsE2PiYrYPtmoUh7cNbT4sEq4vWEbLSfzUJIQC7cCgf7poZti/UmhN/sdy4fFC2Dv1i97xjMAUVMTZeMvY+4d42GPtZ+It8Yq9PmBOxM241lDIK03mRt02gvW1AbxausK1bXpsbm8K+QWTlSzxipaA/4pwq+waFsO+Lw+FuHhLNljN9AIqGJ7QakWO8Oq7NFgYvMqUOrZgzpUAqRrfpxNpc9iWzCzRPaGYzy0MyiDWzTGnBY80sAr/rWR0tQ2B13nvLuGKp3kd7R9TV6r2zltF9v+KhTmgQcGjFfwKBpnlfgsD67bAYgaB0zIH1xylaikD7LQQWZOPh1vEUgfJ1kV80IhDa6TM/C0TmildYfzYmwkKwrN3CZOm0s4DnLed5SPgsgFUJ4hUT7fhcJsqnOo4hnjKKKHFRA/q9ytqNrbE6r0zrLCpvc5GG/JKfMrR9u6BRHs5lg7Qg5YaFJypBovrgcq9cP9VJpLJ2Q+vcuoKrrN1N0MlRgtWJqc7li2kPbHT5CFTWbp6tl2vFNtctkVMEV2qT5HZWnaZonHxeHxggcOx8m62XacXW+V1rxTtXxMnq4o2z9Qqbh8RWp74xldCvnkbCwKeUsvUKqyEszkPi9KwOCi9d4Bq+ej5UjC0fccUNupwTVxzunN31By98lIVDe1YH3/as5u42YuBZzdlyS2OPEAg/5wPEVBhi/+tW+PMIsKzd5e7TtbD2F+8xAp43m4fkfiYW3pAhMLYLGFseDRDwjnOzYP18vqK5dDmp9UsjIAIHWy6lb2eid3tMYznwrIaymy1fZBfgFHFn7TbWsQ1em8va7VPW7q/5deC2O5ykiZiSNTuXtVvvF6Tt4c0NwJF8yeaydvtzWbt9V9ZuaI3+hMXDSEpeLNyxjLLacyhwehCsbl6e17Funbu7VlxG7j250xBsPnbtuPW4k0HXloIp2IsxsZWnagwpRKa75zBIU74BoSMuZWu1E5KkzKc0Os0OAfj1ihy6Mz6lKmt3ODzFAzyri3gu8LI/cR8SmE8q4pK8YNRPjm+DXRNbnqvZEvj4sQkH/kYKAWG43alvuXZQFGOu2Btb0c3ueg+Ct1PaaD1+zq84CbrKP82FXW/eq7ts+ci33MmUeve54t/xLW/8oLqrEGxWx1NQdeqImyAIXAhU1em4mtGuQZlajsD385D4xSPfct+NgGVSPOcHjA2D5+OJhlTYORHwWkjoOXM3hG3d3zGJFiJQOO0Cvg7oiEuYZ2rjY7AOyGq9I2rWAWBUHwZOr/vn7QnmDxIiLAqeIq/r0/ZtPhMLpSTzbYg1WweyIGXrgKye7prJX8jnvuV6HQjQhZqYBYh3a3LmHUPeLLgPEFK+EyiiN0vdBDq/edZCEQgH7/YwTmq9up7fD/BwE8GZU6xLfnh/u67mtcp+iyne6YmYGL0l/xnoo7GCkHyUOiYyGVv0i3XsfcmHRFibb0FmNrS6dAYGMfWs3i3Jx7fe9KvtbZfJAQk7uQ1sLOxu29X91Fz9mZQc6z8wzdrdjvOQLMnMNkHgtzyr84UZCWEDqH++bI9fX19HTMn1KJtzfy5KhoAYIvDXsOWe9520tGpfYVFats1l9xPP6p9k7Z7xIZlk6ZzxIZnGHP6RCwBQm1fWh+R+1m6mIt33IWFZ7UrItBe1MZ1fYLLuVR1zYmsG1V1VxLoaPde8BVk0fnD1l32Y5ygIpdqjZHytFSRCQSiHIGXdoxcrzIvp8wugCSX3oxdTZ1jgwgkpFsO6sWuoSl6FnwE6d0SdYYE8QmgyJWJ1Dd/b4vWfQKC/7KIEsopnlHlRyUeCJCi2yspFZ1igtoUv1poXg0yO+M1AsYkjCt1s+Z3zDacZm8cnPDanAQJ/Bo7+E52TtW8504igPJO1m3HFU7a8vcuWPz7hcYwA213r9vylP17Wv5+sdbV+5X6MSxAQQwS+y5b/FgJJypf1tTjdTbK25NqcT7NnXP4YAYcPCWMsGxtxmaPv1yRoBf0EHXlIUvDp5szO6gRJ1n4Hg9UK0rmR7xfzJTPWsfUzYL7llXV4qLkvGZQdWrHiCpAvgPRQ5Sj9NTlyFIOE2Koak0mNqkv+MVi9hHl6m7V0Hl/92y3NB/KpIhcEYyjd8jlak1sKe0euEUG2zMDoA0LlIYH0JEnCIyfUKR7QepKzOuMuBKttnSbZ7vjw8BL3tenlAGDRM5UPTkZWI0r1aYGQp9HuhKTamJWt7cGsgvKQyNkSJL+bh2SGLVcZXblttN5mQDEVh/M3TvAwN/fnQzHwqqXTv7hOGD7IQ/Kn2PJgxJbf8y33+DbP6pgrL9+nt833MFht3vD0Bu5ZzX3LmVb8Pd9yN1vO4o5NfMFgjXdlYkmg9STq1uPbHJunSsWoe/HtfF1sM6w21/ONKMzMuuWDkRoM7AK9wgFh42LLzX6BzxDwwb2RI6B0qVCd8gm6HhjuCqpQn4ASUEYmlRUb/Q7xxiw0kdd04ktqF4LNWU45feJLEd22b6sFCYnX/eZte4vyTp/QImd5aU4hDQJ2xgzL8KROaLHyqRdD+XTWbr2/qH1I6MVyOrxHXnQKTsFO6SkiWVtNDseB1urMHH7qD3USp58Kgs36AL2Tb2CRx15+eNk+38/KvJI28/blEHuxFoS6BkHQpz3XEZd4HE9l5CMf9CpX1crDnJ/6I/uT9fz4IXoxj8ao4FqxP5u1m+2eB/bM68EmuJwHWzi3a9O/KS9YXGjIdKt2h9vxrXefbAW28tvxdthFFMDA4hBIuZ1EXHIfksdZuxumEbmzdqfurN3f8qzGjM3Rafv8cXnZk9HR2f270k+aMt3tn97PmhnYbDRJ0J/fn/ap30WJ/MqFo3hDzChdWw+pn3PF4T22fMa3nFzHpggYz+pp1u6sirqOfpyBZ7VWp8O63Z1uX3jA32W7PX7dTrsWyGdMquPPIIDT/p9ky3XGNW4X2DGQmh8b8xH5egxYVxBAwCcEaoxoNGdcCoaAjrAQchpqEYo26oTy5fYHCAxOelVeclY+fcYlZu32xSBrdzqXtRvjC7htSBGX6H9WqMDETgUg1pgyShEOwAZTaCUmgVLxioXilE11V6t4St1fBimtVH8t3Kd4DYpzhBuJs+3USZCdiiNUcYl0ciMKkui4xE5HhOITifmgSMjICpLUOoJTiRqDN526sTABiDriUh31gPXqqAd7eidGcybs9E5w4AvrhmIyQ3N6J5woEWYJPw0U3wwpiU6z76GKf1TMjDkNNDQt6MYOz8SgYzpJEJIvyWx/+ER1GigIQmw5UTohe7Fy/GIo3wxb7i9lyyeZ2Rw5KLCanZm5JGOzuZFF25lYMzHHlPozWbsdbLkv/uo8JD/NxPIXseX/DQhY63jmNJ+ZPaO7J71O8hM+nAWa3Waz4M5+weCkV+cs8Fl+wiEC9sz3uI3YUet4vro9gb1hJ8Sro9vZCezsRPfG3EgHvVOLwQnx7ET3zlSrFuyE+MI+prT9NVZUflR9ZW9s2FH11bg/fAyJqlojGIOs3cw/aJC12/rfQJLcVI1uYbJ2U7pvn/WnMjDY/uhGk63XZu2GG0PbX2n7m+Yl85391YL7BxnHJ/I3Kmx/nX2x2azdP2dKccoqiYVWRLJkOLofZOGwg35BFo6/hiuenvD4H4rA4x2TxQjEy7mllzUAAAFdSURBVBDw/yYEIGGJtY71OgDV+oxLxpZD6AM/B3GSiYXlrsp4JhaWn1CwTCzD/IQmTwG3jqHaZmIx1jEIwnZE7UapzkXD8hFFLBMLt46JWaC1kbgHWjKpOoe1Fsu2hV6wicCglRnLuHaP+6OVWTEptLpjdWsfQ2u3SmllBcltiwgEiVUaACaI7C1WBy/HtjWVWVHxJNjCChKrdOQwHCxbHnB9QC6tgFhkecJYZ+32QE2wGZvBu9voAyYrNn7W/domy7aj2w9CylktrF8x2JN6JySwJ7/jpERBBlyxj4oJctnQuuHy0aAdpuf2LVseqNkc4YH1P8najV252fJhHhLsGxFYkLV77FndDXRCdDmfcsV/mC2vhJj1Lec6IUsSEw0QgNbk0j1AwBtm7ebxhncQcGnF32HLfSvfKGu3Sr75c7tAIYAtFtsFd2xDBwK+XeMHCIi/wzJiCPw3WEb/BxvGFOmQQdCzAAAAAElFTkSuQmCC")`,
                      }}
                    ></div>
                    <div className="icon eyes"></div>
                  </div>
                  <span className="amount totalBalanceWallet">
                    <i>
                      <i>৳ ০</i>
                    </i>
                  </span>
                </div>
              </div>
              <div className="member-menu-box member-list">
                <div className="title">
                  <h2>
                    <span>তহবিল</span>
                  </h2>
                </div>
                <ul className="align-center">
                  <li className="deposit" >
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>ডিপোজিট</p>
                    </Link>
                  </li>
                  <li className="deposit">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>ডিপোজিট</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="member-menu-box member-list">
                <div className="title">
                  <h2>
                    <span>হিস্ট্রি</span>
                  </h2>
                </div>
                <ul className="align-center">
                  <li className="deposit">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>বাজি রেকর্ডস</p>
                    </Link>
                  </li>
                  <li className="deposit">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>টার্নওভার</p>
                    </Link>
                  </li>
                  <li className="deposit">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>লেনদেনের রেকর্ড</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="member-menu-box member-list">
                <div className="title">
                  <h2>
                    <span>প্রোফাইল</span>
                  </h2>
                </div>
                <ul className="align-center">
                  <li className="profile">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>ব্যাক্তিগত তথ্য</p>
                    </Link>
                  </li>
                  <li className="profile">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>পাসওয়ার্ড রিসেট করুন</p>
                    </Link>
                  </li>
                  <li className="profile">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>ইনবক্স</p>
                    </Link>
                  </li>
                  <li className="profile">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>রেফার বোনাস</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="member-menu-box member-list">
                <div className="title">
                  <h2>
                    <span>যোগাযোগ করুন</span>
                  </h2>
                </div>
                <ul className="align-center">
                  <li className="deposit">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>লাইভ চ্যাট</p>
                    </Link>
                  </li>
                  <li className="deposit">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>ডিপোজিট</p>
                    </Link>
                  </li>
                  <li className="deposit">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>ডিপোজিট</p>
                    </Link>
                  </li>

                  <li className="deposit">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>ডিপোজিট</p>
                    </Link>
                  </li>
                  <li className="deposit">
                    <Link>
                      <span
                      // className="item-icon"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                      // }}
                      >
                        <img
                          className="item-icon"
                          src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                          alt=""
                        />
                      </span>
                      <p>ডিপোজিট</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
