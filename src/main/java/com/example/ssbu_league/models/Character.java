package com.example.ssbu_league.models;

public enum Character {
    MARIO("Mario", "Mario"),
    DONKEY_KONG("Donkey Kong", "DK"),
    LINK("Link", "Link"),
    SAMUS("Samus", "Samus"),
    DARK_SAMUS("Dark Samus", "D. Samus"),
    YOSHI("Yoshi", "Yoshi"),
    KIRBY("Kirby", "Kirby"),
    FOX("Fox", "Fox"),
    PIKACHU("Pikachu", "Pikachu"),
    LUIGI("Luigi", "Luigi"),
    NESS("Ness", "Ness"),
    CAPTAIN_FALCON("Captain Falcon", "Falcon"),
    JIGGLYPUFF("Jigglypuff", "Jiggly"),
    PEACH("Peach", "Peach"),
    DAISY("Daisy", "Daisy"),
    BOWSER("Bowser", "Bowser"),
    ICE_CLIMBERS("Ice Climbers", "ICs"),
    SHEIK("Sheik", "Sheik"),
    ZELDA("Zelda", "Zelda"),
    DR_MARIO("Dr. Mario", "Dr. Mario"),
    PICHU("Pichu", "Pichu"),
    FALCO("Falco", "Falco"),
    MARTH("Marth", "Marth"),
    LUCINA("Lucina", "Lucina"),
    YOUNG_LINK("Young Link", "Y. Link"),
    GANONDORF("Ganondorf", "Ganon"),
    MEWTWO("Mewtwo", "Mewtwo"),
    ROY("Roy", "Roy"),
    CHROM("Chrom", "Chrom"),
    MR_GAME_AND_WATCH("Mr. Game & Watch", "G&W"),
    META_KNIGHT("Meta Knight", "Meta"),
    PIT("Pit", "Pit"),
    DARK_PIT("Dark Pit", "D. Pit"),
    ZERO_SUIT_SAMUS("Zero Suit Samus", "ZSS"),
    WARIO("Wario", "Wario"),
    SNAKE("Snake", "Snake"),
    IKE("Ike", "Ike"),
    POKEMON_TRAINER("Pokémon Trainer", "PT"),
    DIDDY_KONG("Diddy Kong", "Diddy"),
    LUCAS("Lucas", "Lucas"),
    SONIC("Sonic", "Sonic"),
    KING_DEDEDE("King Dedede", "Dedede"),
    OLIMAR("Olimar", "Olimar"),
    LUCARIO("Lucario", "Lucario"),
    R_O_B("R.O.B.", "ROB"),
    TOON_LINK("Toon Link", "T. Link"),
    WOLF("Wolf", "Wolf"),
    VILLAGER("Villager", "Villager"),
    MEGA_MAN("Mega Man", "Mega"),
    WII_FIT_TRAINER("Wii Fit Trainer", "WFT"),
    ROSALINA_AND_LUMA("Rosalina & Luma", "Rosalina"),
    LITTLE_MAC("Little Mac", "Mac"),
    GRENINJA("Greninja", "Greninja"),
    MII_BRAWLER("Mii Brawler", "Mii Brawler"),
    MII_SWORD_FIGHTER("Mii Swordfighter", "Mii Sword"),
    MII_GUNNER("Mii Gunner", "Mii Gunner"),
    PALUTENA("Palutena", "Palutena"),
    PAC_MAN("Pac-Man", "Pac-Man"),
    ROBIN("Robin", "Robin"),
    SHULK("Shulk", "Shulk"),
    BOWSER_JR("Bowser Jr.", "B. Jr."),
    DUCK_HUNT("Duck Hunt", "Duck Hunt"),
    RYU("Ryu", "Ryu"),
    KEN("Ken", "Ken"),
    CLOUD("Cloud", "Cloud"),
    CORRIN("Corrin", "Corrin"),
    BAYONETTA("Bayonetta", "Bayo"),
    INKLING("Inkling", "Inkling"),
    RIDLEY("Ridley", "Ridley"),
    SIMON("Simon", "Simon"),
    RICHTER("Richter", "Richter"),
    KING_K_ROOL("King K. Rool", "K. Rool"),
    ISABELLE("Isabelle", "Isabelle"),
    INCINEROAR("Incineroar", "Incineroar"),
    PIRANHA_PLANT("Piranha Plant", "P. Plant"),
    JOKER("Joker", "Joker"),
    HERO("Hero", "Hero"),
    BANJO_AND_KAZOOIE("Banjo & Kazooie", "Banjo"),
    TERRY("Terry", "Terry"),
    BYLETH("Byleth", "Byleth"),
    MIN_MIN("Min Min", "Min Min"),
    STEVE("Steve", "Steve"),
    SEPHIROTH("Sephiroth", "Sephiroth"),
    PYRA_MYHTRA("Pyra & Mythra", "P&M"),
    KAZUYA("Kazuya", "Kazuya"),
    SORA("Sora", "Sora");

    private final String fullName;
    private final String shortName;

    Character(String fullName, String shortName) {
        this.fullName = fullName;
        this.shortName = shortName;
    }

    public String getFullName() {
        return fullName;
    }

    public String getShortName() {
        return shortName;
    }
}
