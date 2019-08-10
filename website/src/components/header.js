import { Link } from "gatsby"
import React from "react"
import {
  AppBar,
  Box,
  Card,
  CardMedia,
  CardContent,
  Container,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = 300

const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  card: {
    maxWidth: drawerWidth,
  },
  cardMedia: {
    height: 55,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  image: {
    display: "block",
    margin: "20px auto 0 auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  paper: {
    background: "#0c0a05",
  },
}))

/**
 * This component contains the logic for the top app bar and the navigation drawer.
 *
 * Much of this component has been drawn from the Material UI documentation for a responsive drawer,
 * which has a permanent drawer for tablet- and desktop-sized pages, and then a temporary drawer
 * for mobile pages.
 *
 * Reference: https://material-ui.com/components/drawers/#responsive-drawer
 */
const Header = () => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Hidden xsDown implementation="css">
        <Link to="/">
          <img
            src={require("../images/logo-braces50.png")}
            className={classes.image}
          />
          <Typography variant="h6" component="h1" align="center">
            THE NEW DEVELOPERS<span style={{ color: "red" }}>_</span>
          </Typography>
        </Link>
        <Divider />
      </Hidden>
      <List>
        {/* 
          Eventually the below logic should be replaced by a GraphQL query that pulls information
          for all pages and then programmatically populates them as list items with links.
         */}
        {["Join our mailing list", "Events", "Mentorship", "Opportunities"].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </div>
  )

  return (
    <div>
      <Hidden smUp implementation="css">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap>
              THE NEW DEVELOPERS
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.paper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

export default Header
